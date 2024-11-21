const Project = require("../Model/projectSchema");

// Create a New Project
const createProject = async (req, res) => {
    try {
        const { projectName, description, startDate, endDate, status } = req.body;

        if (!projectName) {
            return res.status(400).json({ message: "Project name is required" });
        }

        const newProject = await Project.create({
            projectName,
            description,
            startDate,
            endDate,
            status,
            createdBy: req.user.userId,
        });

        res.status(201).json({ message: "Project created successfully", newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


// Update an Existing Project
const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { projectName, description, startDate, endDate, status } = req.body;

        const updatedData = {};
        if (projectName) updatedData.projectName = projectName;
        if (description) updatedData.description = description;
        if (startDate) updatedData.startDate = startDate;
        if (endDate) updatedData.endDate = endDate;
        if (status) updatedData.status = status;

        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project updated successfully", updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


// Get All Projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ createdBy: req.user.userId });
        res.status(200).json({ message: "Projects fetched successfully", projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { createProject, updateProject, getAllProjects };
