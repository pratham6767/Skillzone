const express = require("express");
const router = express.Router();
const contactUsController = require("../controllers/ContactUs"); // Default import

router.post("/contact", contactUsController);

module.exports = router;
