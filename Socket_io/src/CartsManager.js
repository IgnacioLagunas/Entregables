import fs from 'fs';
import ProductsManager from './ProductsManager.js';

class CartsManager {
  constructor() {
    this.path = './src/archivos/carts.json';
  }

  async getCarts() {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, JSON.stringify([]));
    }
    const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    return carts;
  }

  async getCart(cartId) {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id === cartId);
    if (!cart) throw new Error(`El carrito id:${cartId} no existe.`);
    const pm = new ProductsManager();
    let productsList = cart.products.map(async (product) => {
      return {
        product: await pm.getProductById(product.id),
        cantidad: product.qtty,
      };
    });
    return await Promise.all(productsList);
  }

  async createCart() {
    const carts = await this.getCarts();
    const cart = {
      id: carts.length ? carts[carts.length - 1].id + 1 : 1,
      products: [],
    };
    carts.push(cart);
    this.saveCarts(carts);
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const Pm = new ProductsManager();
    if (!(await Pm.getProductById(productId)))
      throw new Error(`El producto id:${productId} no existe.`);
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    if (cartIndex < 0) throw new Error(`El carrito id:${cartId} no existe.`);
    const cart = { ...carts[cartIndex] };
    const productIndex = cart.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      cart.products.push({
        id: productId,
        qtty: 1,
      });
    } else {
      cart.products[productIndex].qtty++;
    }
    carts[cartIndex] = cart;
    this.saveCarts(carts);
  }

  // async deleteProduct(id) {
  //   const products = await this.getProducts();
  //   const filteredList = products.filter((prod) => prod.id != id);
  //   this.saveProducts(filteredList);
  // }

  async saveCarts(carts) {
    await fs.promises.writeFile(this.path, JSON.stringify(carts));
  }
}

export default CartsManager;
