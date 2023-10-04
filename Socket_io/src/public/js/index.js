const productsContainer = document.getElementById('products_container');

const getProducts = async () => {
  const response = await fetch('http://localhost:8080/api/products');
  const products = await response.json();
  console.log(products);
  products.forEach((product) => {
    productsContainer.innerHTML += createProductDiv(product);
  });
};

const createProductDiv = (product) => {
  return `<div class="product">
            <img src="${product.images[0]}" alt="">
            <h5 id="nombre">${product.title}</h5>
          </div>`;
};

getProducts();
