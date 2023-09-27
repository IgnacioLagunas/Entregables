import express from 'express';
import ProductManager from './ProductsManager.js';
const pm = new ProductManager();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  const products = await pm.getProducts();
  limit ? res.json(products.slice(0, limit)) : res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const product = await pm.getProductById(+req.params.id);
  res.json(product);
});

app.listen(8080, () => {
  console.log('Escuchando al puerto 8080...');
});
