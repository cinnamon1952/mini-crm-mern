import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { registerSchema, loginSchema } from '../validators/authSchemas.js';

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', {
    expiresIn: '7d',
  });

export const register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const existing = await User.findOne({ email: value.email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const passwordHash = await bcrypt.hash(value.password, 10);
    const user = await User.create({ name: value.name, email: value.email, passwordHash, role: value.role || 'user' });
    const token = signToken(user);
    return res.status(201).json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(value.password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    return res.json({ token, user });
  } catch (err) {
    return next(err);
  }
};


