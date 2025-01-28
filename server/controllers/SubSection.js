// Import necessary modules
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Debug logs to verify keys are loaded
console.log("Assembly AI Key exists:", !!process.env.ASSEMBLY_AI_KEY);
console.log("Gemini Key exists:", !!process.env.GEMINI_API_KEY);

// Initialize Gemini with your 1.5 API key
const genAI = new GoogleGenerativeAI('AIzaSyCiH2lbhj6b08iyvwTIx5dEIBPHlVvnHRw');

// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, description } = req.body;
        const video = req.files.video;

        // Upload video to Cloudinary
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );

        console.log("Video uploaded, getting audio URL");
        
        // Get audio URL using Cloudinary transformation
        const audioUrl = uploadDetails.secure_url.replace(
            '/video/upload/',
            '/video/upload/f_mp3/'
        );

        console.log("Generating transcription");
        // Generate transcription
        const transcription = await generateTranscription(audioUrl);
        console.log("Transcription generated:", transcription);

        console.log("Generating notes");
        // Generate notes
        const notes = await generateNotes(transcription);
        console.log("Notes generated:", notes);

        // Create new subsection with all fields
        const SubSectionDetails = await SubSection.create({
            title,
            timeDuration: `${uploadDetails.duration}`,
            description,
            videoUrl: uploadDetails.secure_url,
            aiNotes: notes,          // Make sure these are included
            transcription: transcription
        });

        // console.log("SubSection created with all fields:", SubSectionDetails.aiNotes);
        console.log("Created SubSection fields:", {
          title: SubSectionDetails.title,
          aiNotes: SubSectionDetails.aiNotes,
          transcription: SubSectionDetails.transcription
      });

        // Update section with new subsection
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: SubSectionDetails._id,
                },
            },
            { new: true }
        ).populate({
            path: "subSection",
            select: "title timeDuration description videoUrl aiNotes transcription" // Include all fields in population
        });

        console.log("Section updated with populated subsection:", updatedSection);

        return res.status(200).json({
            success: true,
            message: "Sub Section Created Successfully",
            data: updatedSection,
        });
    } catch (error) {
        console.error("Error in createSubSection:", error);
        return res.status(500).json({
            success: false,
            message: "Could not create Sub Section",
            error: error.message,
        });
    }
};

// Helper function to generate transcription from Cloudinary audio URL
async function generateTranscription(audioUrl) {
    try {
        const assemblyKey = '06e8ed269f7c4686bc81f93c6826a4be';
        
        // Initial transcription request
        const transcriptionResponse = await axios.post(
            'https://api.assemblyai.com/v2/transcript',
            {
                audio_url: audioUrl
            },
            {
                headers: {
                    'Authorization': assemblyKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Get the transcription ID
        const transcriptId = transcriptionResponse.data.id;
        
        // Poll for results
        let result;
        while (true) {
            result = await axios.get(
                `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
                {
                    headers: {
                        'Authorization': assemblyKey
                    }
                }
            );

            if (result.data.status === 'completed') {
                console.log("Transcription completed:", result.data.text);
                return result.data.text;
            } else if (result.data.status === 'error') {
                throw new Error(`Transcription error: ${result.data.error}`);
            }

            // Wait for 3 seconds before polling again
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    } catch (error) {
        console.error('Transcription error:', error.response?.data || error.message);
        return "";
    }
}

// Helper function to generate notes using Gemini
async function generateNotes(transcription) {
    const maxRetries = 5;
    let currentTry = 0;

    while (currentTry < maxRetries) {
        try {
            console.log(`Attempt ${currentTry + 1} of ${maxRetries}`);
            
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            
            // Simplify the prompt
            const prompt = `
                You are an expert educator. Analyze this lecture transcription and provide a structured response in this exact JSON format:
                {
                    "summary": "A clear 2-3 sentence overview of the main concepts discussed",
                    "keyPoints": [
                        "Main point 1",
                        "Main point 2",
                        "Main point 3",
                        "Main point 4"
                    ],
                    "detailedNotes": "A well-organized, detailed explanation of the concepts, including examples where relevant."
                }

                Make the notes clear, concise, and easy to understand for students.
                
                Transcription: ${transcription}
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            console.log("Raw Gemini response:", response.text());
            
            try {
                // Try to extract JSON from the response
                const jsonMatch = response.text().match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const jsonStr = jsonMatch[0];
                    JSON.parse(jsonStr); // Validate JSON
                    console.log("Valid JSON found:", jsonStr);
                    return jsonStr;
                }
                throw new Error("No valid JSON found in response");
            } catch (e) {
                console.error("JSON parsing error:", e);
                throw new Error("Invalid JSON response");
            }
            return ;
        } catch (error) {
            console.error(`Attempt ${currentTry + 1} failed:`, error);
            currentTry++;
            
            if (currentTry === maxRetries) {
                console.error("All attempts failed");
                // Return a valid JSON as fallback
                return JSON.stringify({
                    summary: "Note generation temporarily unavailable",
                    keyPoints: ["Automatic notes generation failed", "Please try again later"],
                    detailedNotes: "The note generation service is currently unavailable. Please check back later."
                });
            }
            
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

//updation
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      console.log("updated section", updatedSection)
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

//deletion
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }
