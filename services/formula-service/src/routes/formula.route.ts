// services/formula-service/src/routes/formula.route.ts
import { Router, Request, Response } from 'express';
import { FormulaService } from '../services/formula.service';

const router = Router();
const service = new FormulaService();

// GET all formulas
router.get('/', async (_req: Request, res: Response) => {
  const formulas = await service.findAll();
  res.json(formulas);
});

// GET formula by id
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const formula = await service.findOneById(id);
  if (!formula) return res.status(404).json({ message: 'Formula not found' });
  res.json(formula);
});

// POST create formula
router.post('/', async (req: Request, res: Response) => {
  const newFormula = await service.create(req.body);
  res.status(201).json(newFormula);
});

// PUT update formula
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await service.update(id, req.body);
  if (!updated) return res.status(404).json({ message: 'Formula not found' });
  res.json(updated);
});

// DELETE formula
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await service.delete(id);
  if (!deleted) return res.status(404).json({ message: 'Formula not found' });
  res.status(204).send();
});

export default router;
