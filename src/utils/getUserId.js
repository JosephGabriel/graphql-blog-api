import jwt from "jsonwebtoken";

export const getUserId = (request, requiredAuth = true) => {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = jwt.verify(header, process.env.PRISMA_AUTH_SECRET);
    return token.userId;
  }

  if (requiredAuth) {
    throw new Error("Autenticação nescessária");
  }

  return null;
};
