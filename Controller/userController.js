const express = require("express");
const User = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  // JWT import for token generation

// User Registration
const userRegister = async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const addUser = await User.create({
      username,
      email,
      password: hashedPassword,  // Store hashed password
      mobile,
    });

    res.status(200).json({ message: "success", addUser });
  } catch (error) {
    res.status(500).json({ message: "failed", error });
  }
};

// User Update
const userUpdate = async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    // Check if password is provided to hash it before updating
    let updatedData = { username, email, mobile };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);  // Hash new password
    }

    const addUser = await User.updateOne({ email }, updatedData);  // Update by email
    if (!addUser.nModified) {
      return res.status(400).json({ message: "No changes made to the user" });
    }

    res.status(200).json({ message: "success", addUser });
  } catch (error) {
    res.status(500).json({ message: "failed", error });
  }
};

// Get User List
const userList = async (req, res) => {
  try {
    const getAll = await User.find({});
    res.status(200).json({ message: "success", getAll, count: getAll.length });
  } catch (error) {
    res.status(500).json({ message: "failed", error });
  }
};

// Delete User
const userDelete = async (req, res) => {
  try {
    const { userId } = req.params;  // Assuming user ID is passed in the params
    
    const data = await User.deleteOne({ _id: userId });

    if (data.deletedCount === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ message: "deleted success", data });
  } catch (error) {
    res.status(500).json({ message: "failed", error });
  }
};

// User Login
const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Log the incoming email and password for debugging
      console.log("Login request:", { email, password });
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found with this email:", email);
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Log the hashed password from the database
      console.log("Hashed password from DB:", user.password);
  
      // Compare entered password with stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        console.log("Password mismatch for user:", email);
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Log successful password match
      console.log("Password matched successfully!");
  
      // Generate JWT token on successful login
      const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });
  
      res.status(200).json({
        message: "Login successful",
        token, // Return token to the client
      });
    } catch (error) {
      console.log("Error during login:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };

module.exports = { userRegister, userList, userDelete, userUpdate, userLogin };
