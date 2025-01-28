const mongoose = require("mongoose");

const SubSectionSchema = new mongoose.Schema({
	title: { type: String },
	timeDuration: { type: String },
	description: { type: String },
	videoUrl: { type: String },
	aiNotes: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    transcription: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("SubSection", SubSectionSchema);