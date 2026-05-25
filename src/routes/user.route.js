import express from "express";
const router = express.Router();

import { auth } from "../middlewares/auth.middleware.js";
import { requiredRole } from "../middlewares/requiredRole.js";

router.get("/admin-profile", auth, requiredRole("admin"), (req, res) => {
  res.json({ message: "Welcome back admin!!!" });
});

router.get("/moderator-profile", auth, requiredRole("moderator"), (req, res) => {
  res.json({ message: "Welcome back moderator!!!" });
});

router.get("/profile", auth, requiredRole("user"), (req, res) => {
  res.json({ message: "Welcome back user!!!" });
});

export default router;
