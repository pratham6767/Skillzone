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
        const updatedCourse=await Course.findByIdAndUpdate(courseId,{
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
};


// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

        const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});

    }catch(error){
        console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}