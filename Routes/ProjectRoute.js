const express = require("express");
const { createProject, updateProject, getAllProjects } = require("../Controller/projectController");
const authenticate = require("../Middleware/authenticate"); // Assuming you have middleware for authentication

const router = express.Router();

// Create a new project
// router.post("/create", authenticate, createProject);
router.post("/create", authenticate, createProject);

// Update an existing project
router.put("/update/:projectId", authenticate, updateProject);

// Get all projects
router.get("/list", authenticate, getAllProjects);

module.exports = router;
