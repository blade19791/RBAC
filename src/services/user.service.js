import * as userModel from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import { validatePassword } from "../utils/validatePassword.js";
import { generateToken } from "../utils/generateToken.js";

export const createUser = async (data) => {
  const isExisting = await userModel.findUserByEmail(data.email);
  if (isExisting) throw new Error("User already exists");

  const hashedPassword = await hashPassword(data.password);

  const user = await userModel.insertUser({
    ...data,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (data) => {
  const isExisting = await userModel.findUserByEmail(data.email);
  if (!isExisting) throw new Error("Invalid username or password");

  const valid = await validatePassword(data.password, isExisting.password);
  if (!valid) throw new Error("Invalid username or password");

  const token = generateToken(isExisting.id, isExisting.email, isExisting.role);

  return token;
};
