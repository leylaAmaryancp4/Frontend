import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middlewares/auth.middleware.js';

export const register = async (req, res) => {
  try {
    const { name,lastName, email, password, roleId } = req.body;

    // Validate role
    if (!['user', 'admin', 'doctor', 'hospital'].includes(roleId)) {
       return res.status(400).json({ error: 'Invalid role selected' });
    }

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const saltRounds = process.env.BCRYPT_SALT_ROUNDS
      ? parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
      : 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user with the found role's ObjectId
    const user = await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      role: roleId,
    });

    const userObject = user.toObject();
    delete userObject.password;

    res.status(201).json({ message: 'User registered', user: userObject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'An unknown error occurred' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'lax',
    });

    const userObject = user.toObject();
    delete userObject.password;

    // No need to send token in body; cookie handles it
    res.json({ message: 'Login successful', user: userObject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'An unknown error occurred' });
  }
};

export const me = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'An unknown error occurred' });
  }
};