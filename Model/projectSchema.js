const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        projectName: {
            type: String,
            required: [true, "Project name is required"], // Mandatory
            minlength: [3, "Project name must be at least 3 characters long"],
        },
        description: {
            type: String, // Optional
        },
        startDate: {
            type: Date, // Optional
        },
        endDate: {
            type: Date, // Optional
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending", // Optional with default value
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Still required to track who created the project
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
