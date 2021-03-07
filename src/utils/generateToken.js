import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const token = jwt.sign({ userId: payload }, process.env.PRISMA_AUTH_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
