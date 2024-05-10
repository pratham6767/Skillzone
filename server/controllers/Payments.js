const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")


// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {


    //get course id and user id
    const {course_id}=req.body;
    const userId=req.user.id;


    //validation of course id
    if(!course_id){
        return res
          .status(404)
          .json({ success: false, message: "Please provide a valid course id " })
    }


    //valid course details
    let course;
    try{
        course=await Course.findById({course_id});
        if(!course){
            return res
              .status(404)
              .json({ success: false, message: "Coudnt find the course  " })
        }

        //check if user ia already enrolled in the course 
        const uid=new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res
              .status(200)
              .json({ success: false, message: "Student is already Enrolled" })
          }
    }catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
    

    const amount=course.price;
    const currency= "INR";
    const options = {
        amount: amount * 100,
        
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId, 
        }
    }
    
    try {
        // Initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        res.json({
          success: true,
          data: paymentResponse,
        })
    } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ success: false, message: "Could not initiate order." })
      }
    
};