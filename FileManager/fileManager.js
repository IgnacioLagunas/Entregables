const fs = require('fs');

class ProductManager {
  constructor() {
    this.path = './archivos/products.json';
  }

  async getProducts() {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, JSON.stringify([]));
      }
      const products = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
      );
      return products;
    } catch (error) {}
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const foundProduct = products.find((prod) => prod.id === id);
    return foundProduct;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    if (!Object.values(product).every((value) => value)) {
      console.log('Existen campos de producto por rellenar');
      return;
    }
    product = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      ...product,
    };
    products.push(product);
    this.saveProducts(products);
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts();
    const productIndex = products.findIndex((prod) => prod.id === id);
    if (productIndex < 0) {
      return null;
    }
    const newProduct = { ...products[productIndex], ...updatedProduct };
    products[productIndex] = newProduct;
    this.saveProducts(products);
    return newProduct;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filteredList = products.filter((prod) => prod.id != id);
    this.saveProducts(filteredList);
  }

  async saveProducts(productsList) {
    await fs.promises.writeFile(this.path, JSON.stringify(productsList));
  }
}

const product = {
  title: 'Producto 1',
  desc: 'Producto de prueba',
  price: 3000,
  thumb: 'No image',
  stock: 45,
  code: 1234,
};

// Si no es necesario que deje esta parte del codigo me avisan por favor
const runTest = async () => {
  const pm = new ProductManager();
  for (let i = 1; i < 11; i++) {
    await pm.addProduct({
      title: `Producto ${i}`,
      desc: 'Producto de prueba',
      price: 3000,
      thumb: 'No image',
      stock: 45,
      code: 1234 * i,
    });
  }
  pm.getProductById(2)
    .then((producto) => {
      if (!producto) console.log(`\nProducto para modificar no encontrado\n`);
      else {
        console.log('\nProducto encontrado por id:');
        console.log(producto);
      }
    })
    .catch((e) => console.log(e));
  pm.updateProduct(9, { price: 8000 })
    .then((newProduct) => {
      if (!newProduct) console.log(`\nProducto para modificar no encontrado\n`);
      else {
        console.log(`\nProducto actualizado: `);
        console.log(newProduct);
      }
    })
    .catch((e) => console.log(e));
  await pm.deleteProduct(11);
};

runTest();
