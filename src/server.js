import "dotenv/config";
import express from "express";
const app = express();
const port = process.env.PORT;

app.use(express.json());

import auth from "./routes/auth.route.js";
app.use("/api/auth", auth);

import userRoutes from "./routes/user.route.js";
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
