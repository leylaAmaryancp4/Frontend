import { User } from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../config/jwt.config.js';

// Register user
export const registerUser = async (name, email, password, role) => {
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  await user.save();

  return generateTokens(user._id.toString());
};

// Login user
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  if (!user.password) throw new Error('Invalid credentials');

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  return generateTokens(user._id.toString());
};

// Generate access + refresh tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};