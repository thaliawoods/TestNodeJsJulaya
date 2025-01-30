import express from "express";
import { User } from "../db.js";
import authenticate from "../middleware.js";

const router = express.Router();

router.get("/users/:id", authenticate, async (req, res) => {
  if (req.userId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

export default router;
