import express from "express";
import { User, AccessToken } from "../db.js";

const router = express.Router();

// login Route
router.post("/users/login", async (req, res) => {
  const { countryCode, phone, password } = req.body;

  try {
    const user = await User.findOne({ where: { countryCode, phone } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log("User found:", user);

    const ttl = 3600; // token expires in 1 hour
    const createdAt = new Date();

    if (!user.id) {
      console.error("User ID is missing! User:", user);
      return res.status(500).json({ error: "User ID is missing" });
    }

    console.log("Creating Access Token with User ID:", user.id);

    const accessToken = await AccessToken.create({
      userId: user.id,
      ttl,
      createdAt,
    });

    return res.json({
      accessToken: {
        id: accessToken.id,
        ttl: accessToken.ttl,
        createdAt: accessToken.createdAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
