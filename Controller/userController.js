const express = require("express");
const User = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  // JWT import for token generation

// User Registration
const userRegister = async (req, res) => {
  try {
      const { username, email, password, mobile } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      const addUser = await User.create({
          username,
          email,
          password, // Directly pass the raw password; it will be hashed by the schema
          mobile,
      });

      res.status(201).json({ message: "User registered successfully", addUser });
  } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error", error });
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

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare entered password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token on successful login
    const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token, // Return token to the client
      data:user
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


module.exports = { userRegister, userList, userDelete, userUpdate, userLogin };
