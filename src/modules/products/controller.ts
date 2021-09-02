import Products from "../../data/products.json";

function getProducts() {
  return Products;
}

function getProduct(productId: string) {
  return Products.find((product) => product.id === productId);
}

export { getProducts, getProduct };
