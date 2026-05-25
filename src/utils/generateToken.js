import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (id, email, role) => {
  const token = jwt.sign(
    { id: id, email: email, role: role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  return token;
};
