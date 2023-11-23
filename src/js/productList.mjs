import { getProductByCategory } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

let products;
function productCardTemplate(product) {
  return `<div class="product-card">
            <a
              href="/product_pages/index.html?category=${product.category}&&product=${product.id}"
            >
              <img
                class="product-img"
                src="${product.image}"
                alt="${product.title}"
              />
              <h2 class="card__name">${product.title}</h2>
              <p class="product-card__price">$${product.price}</p></a
            >
          </div>`;
}

export default async function product_list(selector, category = "all") {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  console.log("This is category: ", category);
  if (category == "all" || category == "null" || category == undefined) {
    const menClothing = await getProductByCategory("men's clothing");
    const jewelery = await getProductByCategory("jewelery");
    const womenClothing = await getProductByCategory("women's clothing");

    products = menClothing.concat(jewelery, womenClothing);
  } else {
    // get the list of products
    products = await getProductByCategory(category);
    document.querySelector(".dynamic-category-heading").textContent =
      category.charAt(0).toUpperCase() + category.slice(1);
  }

  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
}
