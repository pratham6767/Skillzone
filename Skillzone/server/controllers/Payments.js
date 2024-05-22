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
const { json } = require("express")


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
          courseName:course.courseName,
          courseDescreption:course.courseDescription,
          thumbnail:course.course.thumbnail,
          orderId:paymentResponse.id,
          currency:paymentResponse.currency,amount:paymentResponse.amount,
        })
    } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ success: false, message: "Could not initiate order." })
      }
    
};



//verify signature of razorpay server
exports.verifySignature = async (req, res) => {

    const webhookSecret="12345678";
    const signature=req.headers["x-razorpay-signature"];
    const shasum=crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body))
    const digest=shasum.digest("hex");
    if(signature===digest){
        console.log("payment is authorized");
        const {userId,courseId}=req.payload.payment.entity.notes;

        try{

            const enrolledCourse=await Course.findByIdAndUpdate(
                                                                {_id:courseId},
                                                                {$push:{studentsEnrolled:userId}},
                                                                {new:true});

            if (!enrolledCourse) {
                return res
                  .status(500)
                  .json({ success: false, error: "Course not found" })
            }
            console.log("Updated course: ", enrolledCourse)
                // Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
              $push: {
                courses: courseId,
              },
            },
            { new: true }
        )

        console.log("Enrolled student: ", enrolledStudent)
        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(
              enrolledCourse.courseName,
              `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
            )
        )

        console.log("Email sent successfully: ", emailResponse.response)
            }
        catch(error){
            console.log(error)
        return res.status(400).json({ success: false, error: error.message })

        }
    }

    else{
        console.log(error)
      return res.status(400).json({ success: false,message:"invalid req" })
    }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
  
    const userId = req.user.id

}