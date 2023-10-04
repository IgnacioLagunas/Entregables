import { Router } from 'express';
import ProductManager from '../ProductsManager.js';
const pm = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
  const { limit } = req.query;
  const products = await pm.getProducts();
  limit ? res.json(products.slice(0, limit)) : res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await pm.getProductById(+req.params.id);
  res.json(product);
});

router.post('/', async (req, res) => {
  try {
    await pm.addProduct(req.body);
    res.json({ message: 'Producto agregado con exito' });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  const {
    params: { pid },
  } = req;
  try {
    const productoEditado = await pm.updateProduct(+pid, req.body);
    res.json({
      message: 'Producto editado con exito',
      producto: productoEditado,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  const {
    params: { pid },
  } = req;
  try {
    await pm.deleteProduct(pid);
    res.json({ message: 'Producto eliminado con exito' });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;

/* {
  title: 'Producto prueba',
  desc: 'descripcion',
  price: 20000,
  thumb: [],
  stock: 30,
  code: 'P123'
  status: true,
  category: 'TEST'
}*/
