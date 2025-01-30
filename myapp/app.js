import express from "express";
import authRoutes from "./routes/auth.js"; 

const app = express();
app.use(express.json());

app.use(authRoutes); 

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});



