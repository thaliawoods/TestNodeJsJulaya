import express from "express";
import { User } from "./db.js";
const app = express();
const port = 3000;

app.get("/users/:id", async (req, res) => {
  const { id } = req.params; // Extract id from request parameters
  const user = await User.findByPk(id); // Find user by id);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});