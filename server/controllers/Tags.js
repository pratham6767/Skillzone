const Tag=require("../models/tags");

//create tag handler function

exports.createTag=async(req,res)=>{
    try{
        //fetch data
        const {name,descreption}=req.body;

        //validation
        if(!name||!descreption){
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }

        //create entry in db
        const tagDetails=await Tag.create({
            name:name,
            descreption:descreption,
        })
        console.log(tagDetails);

        res.status(200).json({
            success: true,
            message: "Tag Created Successfully",
        })



    }catch(err){
        console.error(err)
    res.status(500).json({
      success: false,
      message: "Failed to create Tag",
      error: err.message,
    })
    }
};


//get all tags

exports.showAllTags=async(req,res)=>{
    try{
        const allTags=await Tag.findOne({},{name:true,descreption:true});
        res.status(200).json({
            success: true,
            message: "All Tags are returned sucessfully",
            error: err.message,
        })


    }catch(err){
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Failed to get all Tag",
            error: err.message,
        });
    }
}