import { getLocalStorage } from "./utils.mjs";

export function computeCartTotal() {
  let cart = getLocalStorage("so-cart");
  // Set sales tax to 6%
  const tax = 6;
  // Set the sales tax amount to zero
  let salesTax = 0;
  // Set the cart subtotal to zero
  let subtotalCart = 0;
  // Set the cart total to zero
  let totalCart = 0;

  if (cart != null) {
    cart.forEach((item) => {
      subtotalCart += item.price * item.productOnHold;
      salesTax = (subtotalCart * tax) / 100;
      totalCart = subtotalCart + salesTax;
    });
  }
  // Display the subtotal to the cart subtotal section
  document.querySelector("#cart-subtotal").innerHTML = `$${subtotalCart.toFixed(
    2
  )}`;
  // Display the sales tax
  document.querySelector("#sales-tax").innerHTML = `$${salesTax.toFixed(2)}`;
  // Display the total to the cart total section
  document.querySelector("#cart-total").innerHTML = `$${totalCart.toFixed(2)}`;
}

computeCartTotal();
