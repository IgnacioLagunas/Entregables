import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', () => {});

router.get('/:id', () => {});

router.post('/', authMiddleware, (req, res) => {
  res.json({ message: 'Usuario creado' });
});

router.delete('/:id', () => {});

export default router;
