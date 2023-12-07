import checkoutProcess from "./checkoutProcess.mjs";

checkoutProcess.init("so-cart", ".checkout-summary");
let myForm = document.querySelector(".form-checkout");
myForm.addEventListener("submit", handleCheckout);

export function handleCheckout(e) {
  e.preventDefault();
  let myCheckOutForm = document.querySelector(".form-checkout");
  let errors = checkoutProcess.checkout(myCheckOutForm);
  if (errors) {
    alert(Object.values(errors).toString().replace(/,/g, "\n"));
  }
}
