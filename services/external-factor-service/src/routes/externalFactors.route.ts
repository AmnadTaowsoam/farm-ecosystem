// services/external-factor-service/src/routes/externalFactors.route.ts
import { Router, Request, Response, NextFunction } from 'express';
import ExternalFactorsService from '../services/externalFactors.service';

const router = Router();

// GET /external-factors
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await ExternalFactorsService.findAll();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// GET /external-factors/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await ExternalFactorsService.findById(+req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// — เพิ่ม route นี้ก่อน /:id —
router.get(
  '/:id/customer_id/:customer_id',
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const customerId = Number(req.params.customer_id);
    try {
      const item = await ExternalFactorsService.findByIdAndCustomer(id, customerId);
      if (!item) {
        return res.status(404).json({ message: 'Not found for this customer' });
      }
      res.json(item);
    } catch (err) {
      next(err);
    }
  }
);

// GET /external-factors/:id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await ExternalFactorsService.findById(+req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /external-factors
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await ExternalFactorsService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// PUT /external-factors/:id
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await ExternalFactorsService.update(+req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /external-factors/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ExternalFactorsService.delete(+req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
