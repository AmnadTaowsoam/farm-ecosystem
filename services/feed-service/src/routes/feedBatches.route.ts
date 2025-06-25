// feed-service/src/routes/feedBatches.route.ts

import { Router, Request, Response } from 'express';
import { FeedBatchesService } from '../services/feedBatches.service';
import { FeedBatch } from '../models/feedBatch.model';
import { AppDataSource } from '../utils/dataSource';

const repo = AppDataSource.getRepository(FeedBatch);
const service = new FeedBatchesService(repo);
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

router.get('/:productionDate/:feedBatchId', async (req, res) => {
  const { productionDate, feedBatchId } = req.params;
  const entity = await service.findById(new Date(productionDate), Number(feedBatchId));
  if (!entity) return res.status(404).json({ error: 'Not found' });
  res.json(entity);
});

router.put('/:productionDate/:feedBatchId', async (req, res) => {
  const { productionDate, feedBatchId } = req.params;
  try {
    const updated = await service.update(new Date(productionDate), Number(feedBatchId), req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

router.delete('/:productionDate/:feedBatchId', async (req, res) => {
  const { productionDate, feedBatchId } = req.params;
  await service.delete(new Date(productionDate), Number(feedBatchId));
  res.status(204).send();
});

export default router;

