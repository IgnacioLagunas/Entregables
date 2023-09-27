class ProductManager {
  constructor() {
    this.products = [];
  }
  getProducts() {
    return this.products;
  }
  addProduct(title, desc, price, thumb, stock, code) {
    if (!title || !desc || !price || !thumb || !stock || !code) {
      console.log('\nError: Ingrese todo los datos del producto\n');
      return;
    }
    if (this.products.find((product) => product.code == code)) {
      console.log('\nError: Este producto ya ha sido ingresado\n');
      return;
    }
    const id = this.products.length + 1;
    const product = {
      title,
      desc,
      price,
      thumb,
      stock,
      code,
      id,
    };
    this.products.push(product);
    console.log('producto agregado:');
    console.log(product);
  }

  getProductById(id) {
    const productFound = this.products.find((prod) => prod.id == id);
    if (productFound) {
      console.log('Producto encontrado: ');
      console.log(productFound);
      return productFound;
    } else console.log(`Producto id ${id} no encontrado`);
  }
}

const manager = new ProductManager();
manager.addProduct(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'sin imagen',
  '25',
  'abc123'
);
manager.addProduct(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'sin imagen',
  '25',
  'abc123'
);
console.log(manager.getProducts());
console.log(manager.getProducts());
manager.getProductById(1); // Si encuentra
manager.getProductById(5); // No encuentra
