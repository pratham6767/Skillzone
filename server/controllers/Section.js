const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");


// CREATE a new section
exports.createSection = async (req, res) => {
    try{
        //fetching data
        const {sectionName,courseId}=req.body;

        //validating data
        if (!sectionName||!courseId) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

        //create section
        const newSection= await Section.create({
            sectionName
        });

        //update course with the objid of section
        const updatedCourse=await Course.findByIdAndUpdate({courseId},{
            $push:({
                courseContent:newSection._id,
            })
        },{new:true}).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        }).exec();

        //return 
        res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
    }
    catch(error){
        // Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		}); 
    }

};

// UPDATE a section
exports.updateSection = async (req, res) => {
    try{
        //fetch data
        const { sectionName, sectionId,courseId } = req.body;

        //validating data
        if (!sectionName||!sectionId) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

        //update data

        const section=await Section.findByIdAndUpdate({sectionId},{
            sectionName:sectionName
        },{new:true});

        //return
        res.status(200).json({
			success: true,
			message: "Section Updated successfully",

		});

    }
    catch(error){

    }
}