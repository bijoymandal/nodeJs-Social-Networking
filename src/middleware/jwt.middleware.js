// src/middleware/jwt.middleware.js
import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided" });
    }

    // Remove "Bearer " prefix if present
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trim();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload || !payload.userID) {
            return res.status(401).json({ message: "Unauthorized. Invalid token" });
        }

        req.user = payload;
        console.log(req.user);
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).json({ message: "Unauthorized. Invalid token" });
    }
};

export default jwtAuth;
