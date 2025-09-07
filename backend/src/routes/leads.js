import { Router } from 'express';
import { authRequired } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import { createLead, listLeads, getLead, updateLead, deleteLead } from '../controllers/leadController.js';

const router = Router({ mergeParams: true });

router.use(authRequired);

// Mounted under /api/customers
router.post('/:customerId/leads', requireRole(['admin', 'user']), createLead);
router.get('/:customerId/leads', listLeads);
router.get('/:customerId/leads/:leadId', getLead);
router.put('/:customerId/leads/:leadId', requireRole(['admin', 'user']), updateLead);
router.delete('/:customerId/leads/:leadId', requireRole(['admin']), deleteLead);

export default router;


