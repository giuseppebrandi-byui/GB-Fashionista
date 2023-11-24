import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  let subtotal = (item.price * item.productOnHold).toFixed(2);
  const newItems = `
            <tr class="basket-product">
              <td>
                <a href="#"><ion-icon class="remove-product" name="trash-outline"></ion-icon></a>
              </td>
              <td>
                <a href="/product_pages/index.html?category=${
                  item.category
                }&&product=${item.id}" class="cart-card__image">
                  <img
                    src="${item.image}"
                    alt="${item.title}"
                  />
                </a>
              </td>
              <td>
                <a href="/product_pages/index.html?category=${
                  item.category
                }&&product=${item.id}">
                  <h2 class="card__name">${item.title}</h2>
                </a>
              </td>
              <td>$${item.price.toFixed(2)}</td>
              <td><input type="number" value=${item.productOnHold} /></td>
              <td>$${subtotal}</td>
            </tr>`;

  return newItems;
}

renderCartContents();
