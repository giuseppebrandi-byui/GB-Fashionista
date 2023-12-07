import checkoutProcess from "./checkoutProcess.mjs";
import { formDataToJSON } from "./checkoutProcess.mjs";

checkoutProcess.init("so-cart", ".checkout-summary");
let myForm = document.querySelector(".form-checkout");
myForm.addEventListener("submit", handleCheckout);

export function handleCheckout(e) {
  e.preventDefault();
  let myForm = document.querySelector(".form-checkout");
  let errors = checkoutProcess.checkout(myForm);
  if (errors) {
    alert(Object.values(errors).toString().replace(/,/g, "\n"));
  }
}
