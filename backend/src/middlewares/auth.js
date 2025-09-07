import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = { id: payload.id, role: payload.role };
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


