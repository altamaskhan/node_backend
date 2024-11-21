const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
        req.user = { userId: verified.userId };
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authenticate;
