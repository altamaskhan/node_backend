const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");  // Make sure you're using bcryptjs for consistency

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        minLength: [3, "Name should min 3 char"],
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

// Password hashing before saving
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10); // Hash password with bcrypt
    next();
});

module.exports = mongoose.model("User", userSchema);
