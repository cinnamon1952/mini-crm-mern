import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  { timestamps: true }
);

userSchema.method('toJSON', function json() {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
});

const User = mongoose.model('User', userSchema);
export default User;


