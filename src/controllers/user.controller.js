import * as userService from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err.message === "User already exists" || err.code === "23505")
      return res.status(400).json({ error: "User already exists" });
    console.log(err.message);
    res.status(500).json({ error: "Server side error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const token = await userService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (err) {
    if (err.message === "Invalid username or password")
      return res.status(400).json({ error: err.message });
    console.log(err.message);
    return res.status(500).json({ error: "Server side error" });
  }
};
