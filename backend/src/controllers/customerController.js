import Customer from '../models/Customer.js';
import Lead from '../models/Lead.js';
import { createCustomerSchema, updateCustomerSchema } from '../validators/customerSchemas.js';

export const createCustomer = async (req, res, next) => {
  try {
    const { value, error } = createCustomerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const customer = await Customer.create({ ...value, ownerId: req.user.id });
    return res.status(201).json(customer);
  } catch (err) {
    return next(err);
  }
};

export const listCustomers = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '10', 10), 1);
    const search = (req.query.search || '').trim();

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const [items, total] = await Promise.all([
      Customer.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Customer.countDocuments(query),
    ]);

    return res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    return next(err);
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    const leads = await Lead.find({ customerId: customer._id }).sort({ createdAt: -1 });
    return res.json({ ...customer.toObject(), leads });
  } catch (err) {
    return next(err);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const { value, error } = updateCustomerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const customer = await Customer.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    return res.json(customer);
  } catch (err) {
    return next(err);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    await Lead.deleteMany({ customerId: customer._id });
    return res.json({ message: 'Customer deleted' });
  } catch (err) {
    return next(err);
  }
};


