import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRoutes from './routes/auth.js';
import customerRoutes from './routes/customers.js';
import leadRoutes from './routes/leads.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// DB (skip during tests)
if (process.env.NODE_ENV !== 'test') {
  await connectDb();
}

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/customers', leadRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'test') console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

export default app;


