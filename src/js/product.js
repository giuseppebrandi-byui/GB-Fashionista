import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import { renderProductDetails } from "./productDetails.mjs";
import { findProductById } from "./productData.mjs";

const productId = getParam("product");
const productCategory = getParam("category");

function addProductToCart(product) {
  console.log(product);
  let cart = getLocalStorage("so-cart");
  cart = cart ?? [];
  console.log("cart: ", cart);
  cart.push(product);
  setLocalStorage("so-cart", cart);
  console.log("cart: ", getLocalStorage("so-cart"));
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(productCategory, productId);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

renderProductDetails(productCategory, productId);
