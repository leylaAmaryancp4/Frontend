import bcrypt from "bcrypt";

// Hash a password
export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// Compare plain password with hashed password
export const comparePassword = async (password, hashed) => {
  return bcrypt.compare(password, hashed);
};