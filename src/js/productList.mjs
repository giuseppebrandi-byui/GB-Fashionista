import { getProductByCategory } from "./productData.mjs";

function productCardTemplate(product) {
  return `<div class="product-card">
            <a
              href="product_pages/index.html?category=${product.category}&&product=${product.id}"
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

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear && parentElement !== null) {
    parentElement.innerHTML = "";
  }
  console.log("This is a great list: ", list);
  const htmlString = list.map(templateFn);

  if (parentElement !== null) {
    parentElement.insertAdjacentHTML(position, htmlString.join(""));
  }
}

export default async function product_list(selector, category) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getProductByCategory(category);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
}
