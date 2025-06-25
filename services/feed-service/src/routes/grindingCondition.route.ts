// feed-service/src/routes/grindingCondition.route.ts
import { Router, Request, Response } from 'express';
import { GrindingConditionService } from '../services/grindingCondition.service';
import { GrindingCondition } from '../models/grindingCondition.model';
import { AppDataSource } from '../utils/dataSource';

const repo = AppDataSource.getRepository(GrindingCondition);
const service = new GrindingConditionService(repo);
const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

router.get('/', async (_req, res) => {
  const list = await service.findAll();
  res.json(list);
});

router.get('/:id', async (req, res) => {
  const entity = await service.findById(Number(req.params.id));
  if (!entity) return res.status(404).json({ error: 'Not found' });
  res.json(entity);
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await service.update(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

router.delete('/:id', async (req, res) => {
  await service.delete(Number(req.params.id));
  res.status(204).send();
});

export default router;
