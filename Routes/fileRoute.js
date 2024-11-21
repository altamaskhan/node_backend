const express = require("express");
const router = express.Router();
const {
  createFile,
  updateFile,
  getFilesByProject,
  deleteFile,
} = require("../Controller/fileController");

const authenticate = require("../Middleware/authenticate"); // Assuming you have middleware for authentication


// Create a new file
router.post("/create", createFile);

// Update a file by ID
router.put("/:fileId", updateFile);

// Get all files for a project
router.get("/:projectId", authenticate, getFilesByProject);

// Delete a file by ID
router.delete("/:fileId", deleteFile);

module.exports = router;
