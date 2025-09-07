import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Lost'], default: 'New', index: true },
    value: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;


