// services/economic-service/src/routes/economicData.route.ts
import { Router, Request, Response, NextFunction } from 'express';
import EconomicDataService from '../services/economicData.service';

const router = Router();

// GET /economic-data
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await EconomicDataService.findAll();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// GET /economic-data/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await EconomicDataService.findById(+req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// POST /economic-data
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await EconomicDataService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// PUT /economic-data/:id
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await EconomicDataService.update(+req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /economic-data/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await EconomicDataService.delete(+req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// GET /economic-data/:id/customer_id/:customer_id
router.get(
  '/:id/customer_id/:customer_id',
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const customerId = Number(req.params.customer_id);
    try {
      // สมมติว่าคุณเพิ่มฟังก์ชันใน service สำหรับกรณีนี้
      const data = await EconomicDataService.findByIdAndCustomer(id, customerId);
      if (!data) {
        return res.status(404).json({ message: 'Not found for this customer' });
      }
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
);

// GET /economic-data/:id
router.get('/:id', async (req, res, next) => {
  try {
    const data = await EconomicDataService.findById(+req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
