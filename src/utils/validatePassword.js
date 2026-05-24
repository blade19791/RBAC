import bcrypt from "bcrypt";

export const validatePassword = async (password, hashedPassword) => {
  const validate = await bcrypt.compare(password, hashedPassword);
  return validate;
};
