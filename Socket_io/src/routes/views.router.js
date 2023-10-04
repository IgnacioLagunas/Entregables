import { Router } from 'express';

const router = Router();

router.get('/view1', (req, res) => {
  res.render('view1');
});

router.get('/user', (req, res) => {
  res.render('view2');
});

export default router;
