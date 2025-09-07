import mongoose from 'mongoose';

const connectDb = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mini_crm';
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(mongoUri, {
    autoIndex: true,
  });
};

export default connectDb;


