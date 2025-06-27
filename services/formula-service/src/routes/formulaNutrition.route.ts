// services/formula-service/src/routes/formulaNutrition.route.ts
import { Router, Request, Response } from 'express';
import { FormulaNutritionService } from '../services/formulaNutrition.service';

const router = Router();
const service = new FormulaNutritionService();

router.get('/', async (_req, res) => {
  const items = await service.findAll();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const item = await service.findOneById(id);
  if (!item) return res.status(404).json({ message: 'Nutrition data not found' });
  res.json(item);
});

router.post('/', async (req, res) => {
  const newItem = await service.create(req.body);
  res.status(201).json(newItem);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updated = await service.update(id, req.body);
  if (!updated) return res.status(404).json({ message: 'Nutrition data not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await service.delete(id);
  if (!deleted) return res.status(404).json({ message: 'Nutrition data not found' });
  res.status(204).send();
});

export default router;
