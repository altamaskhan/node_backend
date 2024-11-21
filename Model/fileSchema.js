const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project", // Reference to the Project schema
    required: true,
  },
  fileName: {
    type: String,
    required: [true, "File name is required"],
  },
  transcript: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("File", fileSchema);
