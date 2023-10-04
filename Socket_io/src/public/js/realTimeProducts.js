const socketServer = io();

const getProducts = async () => {
  const { data: products } = await axios.get(
    'http://localhost:8080/api/products'
  );
  renderProducts(products);
};

const renderProducts = (products) => {
  productsContainer.innerHTML = '';
  products.forEach((product) => {
    productsContainer.innerHTML += createProductDiv(product);
  });
};

const createProductDiv = (product) => {
  return `<div class="product">
        <img src="${product.images[0]}" alt="">
        <h5 id="nombre">${product.title}</h5>
        <p id="id">${product.id}</p>
        
        </div>`;
};

getProducts();

const productsContainer = document.getElementById('products_container');
const formProducto = document.getElementById('agregar_producto_form');
const formEliminarProducto = document.getElementById('eliminar_producto_form');

formProducto.onsubmit = async (e) => {
  e.preventDefault();
  const {
    target: [title, description, price, image],
  } = e;
  const newProduct = {
    title: title.value,
    description: description.value,
    price: price.value,
    images: [image.value],
  };
  await axios.post('http://localhost:8080/api/products', newProduct);
  socketServer.emit('new-product-added');
};

formEliminarProducto.onsubmit = async (e) => {
  e.preventDefault();
  const {
    target: {
      id: { value: id },
    },
  } = e;
  await axios.delete(`http://localhost:8080/api/products/${id}`);
  socketServer.emit('new-product-deleted');
};

socketServer.on('product-refresh', () => {
  getProducts();
});
