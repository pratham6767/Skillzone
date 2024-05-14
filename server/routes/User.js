// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {login, signUp, sendOTP} = require("../controllers/Auth")
const {
    resetPasswordToken,
    resetPassword,
  } = require("../controllers/ResetPassword")
const { auth } = require("../middlewares/auth")

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

module.exports = router;