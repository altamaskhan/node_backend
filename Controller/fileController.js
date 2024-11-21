
const File = require("../Model/fileSchema");

const Project = require("../Model/projectSchema"); // Optional: For validation

// Create a new file for a project
const createFile = async (req, res) => {
  try {
    const { projectId } = req.body;
    const { fileName, transcript } = req.body;

    if (!fileName || !projectId) {
      return res.status(400).json({ message: "File name and project ID are required" });
    }

    // Optional: Validate project existence
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newFile = await File.create({ projectId, fileName, transcript });

    res.status(201).json({ message: "File created successfully", file: newFile });
  } catch (error) {
    console.error("Error creating file:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update a file by ID
const updateFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { fileName, transcript } = req.body;

    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { fileName, transcript },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ message: "File updated successfully", file: updatedFile });
  } catch (error) {
    console.error("Error updating file:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get all files for a specific project
const getFilesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const files = await File.find({ projectId });

    res.status(200).json({ message: "Files fetched successfully", files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Delete a file by ID
const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    const deletedFile = await File.findByIdAndDelete(fileId);
    if (!deletedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ message: "File deleted successfully", file: deletedFile });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  createFile,
  updateFile,
  getFilesByProject,
  deleteFile,
};
