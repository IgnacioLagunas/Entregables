import fs from 'fs';

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

export default ProductManager;
