// src/routes/index.ts
import { Router } from 'express';

import customerRouter from './customer.route';
import subscriptionsRouter from './subscriptions.route';


const router = Router();

router.use('/customers',               customerRouter);
router.use('/subscriptions',           subscriptionsRouter);

export default router;
