import express from "express";
const router = express.Router();

import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
