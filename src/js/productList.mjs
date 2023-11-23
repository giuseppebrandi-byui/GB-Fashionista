import { getProductByCategory } from "./productData.mjs";

function productCardTemplate(product) {
  return ``;
}

export default async function product_list(selector, category) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getProductByCategory(category);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
}
