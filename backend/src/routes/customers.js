import { Router } from 'express';
import { authRequired } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import {
  createCustomer,
  listCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController.js';

const router = Router();

router.use(authRequired);

router.post('/', requireRole(['admin', 'user']), createCustomer);
router.get('/', listCustomers);
router.get('/:id', getCustomer);
router.put('/:id', requireRole(['admin', 'user']), updateCustomer);
router.delete('/:id', requireRole(['admin']), deleteCustomer);

export default router;


