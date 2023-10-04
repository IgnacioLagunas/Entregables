import { Router } from 'express';
import CartsManager from '../CartsManager.js';

const router = new Router();
const cm = new CartsManager();

router.get('/', async (req, res) => {
  res.json(await cm.getCarts());
});

router.get('/:cid', async (req, res) => {
  try {
    res.json(await cm.getCart(+req.params.cid));
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  await cm.createCart();
  res.json({ message: 'Carrito creado con exito' });
});

router.post('/:cid/product/:pid', async (req, res) => {
  const {
    params: { cid, pid },
  } = req;
  try {
    await cm.addProductToCart(+cid, +pid);
    res.json({ message: 'Producto agregado con exito' });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
