import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import { renderProductDetails } from "./productDetails.mjs";
import { findProductById } from "./productData.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import getRecommendProducts from "./productListRecommended.mjs";
import { displayElementsBySearchTerm } from "./productListDisplay.mjs";

loadHeaderFooter();
displayElementsBySearchTerm();

const productId = getParam("product");
const productCategory = getParam("category");
getRecommendProducts(productCategory.productId);

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  cart = cart ?? [];
  let duplicate = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      // if the product id matches the additional added product change the
      // boolean value to true
      duplicate = true;
      // if the product added already exists increment the quantity by 1
      cart[i] = { ...cart[i], productOnHold: cart[i].productOnHold + 1 };
    }
  }
  if (!duplicate) {
    // if product is not already in the cart then add the object plus a key value
    // pair holding the number of the duplicate products in the cart.
    cart.push({ ...product, productOnHold: 1 });
  }

  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler() {
  const product = await findProductById(productCategory, productId);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

renderProductDetails(productCategory, productId);
