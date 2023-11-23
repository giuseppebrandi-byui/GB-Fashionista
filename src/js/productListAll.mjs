import { getProductByCategory } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

let products;

export function productCardTemplate(product) {
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

export default async function getAllProducts() {
  const menClothing = await getProductByCategory("men's clothing");
  const jewelery = await getProductByCategory("jewelery");
  const womenClothing = await getProductByCategory("women's clothing");

  products = menClothing.concat(jewelery, womenClothing);
  console.log("Full list: ", products);
  const el = document.querySelector(".product-fullList");
  renderListWithTemplate(productCardTemplate, el, products);
}
