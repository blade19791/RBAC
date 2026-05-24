import express from "express";
const router = express.Router();

import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import validate from "../middlewares/validateInput.js";
import { loginSchema, userSchema } from "../validators/auth.validator.js";

router.post("/register", validate(userSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;
