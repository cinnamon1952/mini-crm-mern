import Lead from '../models/Lead.js';
import Customer from '../models/Customer.js';
import { createLeadSchema, updateLeadSchema } from '../validators/leadSchemas.js';

export const createLead = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    const { value, error } = createLeadSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const lead = await Lead.create({ ...value, customerId });
    return res.status(201).json(lead);
  } catch (err) {
    return next(err);
  }
};

export const listLeads = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const status = req.query.status;
    const query = { customerId };
    if (status) query.status = status;
    const leads = await Lead.find(query).sort({ createdAt: -1 });
    return res.json(leads);
  } catch (err) {
    return next(err);
  }
};

export const getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.leadId, customerId: req.params.customerId });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    return res.json(lead);
  } catch (err) {
    return next(err);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const { value, error } = updateLeadSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.leadId, customerId: req.params.customerId },
      value,
      { new: true }
    );
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    return res.json(lead);
  } catch (err) {
    return next(err);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOneAndDelete({ _id: req.params.leadId, customerId: req.params.customerId });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    return res.json({ message: 'Lead deleted' });
  } catch (err) {
    return next(err);
  }
};


