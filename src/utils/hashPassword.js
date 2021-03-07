import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error("A senha deve ser maior que ou igual a 8 caracteres");
  }

  return bcrypt.hash(password, 10);
};
