// services/auth-service/src/routes/authRoutes.ts
import { Router, Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { User } from '../models/user.model';
import { RefreshToken } from '../models/refreshToken.model';
import { DataSource } from 'typeorm';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/config';

export function createAuthRouter(dataSource: DataSource) {
  const router = Router();
  const userRepo = dataSource.getRepository(User);
  const tokenRepo = dataSource.getRepository(RefreshToken);
  const authService = new AuthService(userRepo, tokenRepo);

  router.post('/signup', async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    try {
      const result = await authService.signup(email, username, password);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const result = await authService.login(username, password);
      res.json(result);
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  });

  router.post('/refresh', async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
      const result = await authService.refresh(refreshToken);
      res.json(result);
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  });

  // Get current user profile
  router.get('/me', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.substring(7); // remove "Bearer "
    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const userId = payload.sub;
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    try {
      const user = await userRepo.findOne({
        where: { user_id: userId },
        select: ['user_id', 'username', 'email', 'role', 'created_at'],
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Rename fields to camelCase if you prefer
      res.json({
        userId: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
      });
    } catch (err: any) {
      res.status(500).json({ message: 'Could not load user profile' });
    }
  });

  return router;
}

