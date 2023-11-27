import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  const removeBtn = document.querySelectorAll(".remove-product");
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener("click", deleteCartObject);
  }
  const cartQuantity = document.querySelectorAll(".cartQuantity");
  // console.log("Cart Quantity:", cartQuantity);
  for (let i = 0; i < cartQuantity.length; i++) {
    cartQuantity[i].addEventListener("change", updateObjectQuantity);
  }
}

function updateObjectQuantity(e) {
  const cartItems = getLocalStorage("so-cart");

  for (let i = 0; i < cartItems.length; i++) {
    if (
      Number.parseInt(cartItems[i].id) ===
      Number.parseInt(e.currentTarget.getAttribute("productid"))
    ) {
      cartItems[i].productOnHold = Number.parseInt(e.currentTarget.value);
      // console.log(cartItems[i].productOnHold);
    }
  }
  setLocalStorage("so-cart", cartItems);
  document.location.reload();
}

function deleteCartObject(e) {
  const cartItems = getLocalStorage("so-cart");
  for (let i = 0; i < cartItems.length; i++) {
    if (
      Number.parseInt(cartItems[i].id) === Number.parseInt(e.currentTarget.id)
    ) {
      cartItems.splice(i, 1);
    }
  }
  setLocalStorage("so-cart", cartItems);
  document
    .getElementById(e.currentTarget.id)
    .parentElement.parentElement.remove();
}

function cartItemTemplate(item) {
  let subtotal = (item.price * item.productOnHold).toFixed(2);
  const newItems = `
            <tr class="basket-product">
              <td>
                <ion-icon class="remove-product" id="${item.id}"
    name="trash-outline"></ion-icon>
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
              <td><input type="number" class="cartQuantity" productid="${
                item.id
              }" value=${item.productOnHold} /></td>
              <td>$${subtotal}</td>
            </tr>`;

  return newItems;
}

renderCartContents();
