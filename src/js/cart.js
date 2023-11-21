import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card">
  <a href="/product_pages/index.html?category=${item.category}&&product=${item.id}" class="cart-card__image">
    <img
      src="${item.image}"
      alt="${item.title}"
    />
  </a>
  <a href="/product_pages/index.html?category=${item.category}&&product=${item.id}">
    <h2 class="card__name">${item.title}</h2>
  </a>
  <p class="cart-card__quantity">qty: ${item.productOnHold}</p>
  <p class="cart-card__price">$${item.price}</p>
</li>`;

  return newItem;
}

renderCartContents();
