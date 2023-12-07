import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const cartItems = items.map((item) => {
    return {
      id: item.id,
      price: item.price,
      name: item.title,
    };
  });
  return cartItems;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
    this.calculateOrdertotal();
  },
  calculateItemSummary: function () {
    // calculate and display the total amount of the items in the cart.
    const subtotalEl = document.querySelector("#cart-subtotal");

    if (this.list != null) {
      this.list.forEach((item) => {
        this.itemTotal += item.price * item.productOnHold;
        subtotalEl.innerHTML = `$${this.itemTotal.toFixed(2)}`;
      });
    }
  },
  calculateOrdertotal: function () {
    // calculate the tax amount. Then use it to along with the cart total to figure out the order total
    const taxRate = 0.06;
    this.tax = (this.itemTotal * taxRate).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) + parseFloat(this.tax)
    ).toFixed(2);

    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    // once the totals are all calculated display them in the order summary page
    const salesTaxEl = document.querySelector("#sales-tax");
    const cartTotalEl = document.querySelector("#cart-total");
    salesTaxEl.innerHTML = `$${this.tax}`;
    cartTotalEl.innerHTML = `$${this.orderTotal}`;
  },

  checkout: function (form) {
    const json = formDataToJSON(form);
    let error = this.sanitizeCheckOut(json);
    const date = new Date();
    json.orderDate = date.toISOString();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.items = packageItems(this.list);
    if (Object.keys(error).length > 0) {
      return error;
    } else {
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    }
  },

  sanitizeCheckOut: function (json) {
    let visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    let mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    let amexpRegEx = /^(?:3[47][0-9]{13})$/;
    let cvvRegEx = /^\d+$/;
    let monthRegex = /^(0?[1-9]|1[012])$/;
    let errorObject = {};

    if (
      !(
        visaRegEx.test(json.cardNumber.replace(/\s/g, "")) ||
        mastercardRegEx.test(json.cardNumber.replace(/\s/g, "")) ||
        amexpRegEx.test(json.cardNumber.replace(/\s/g, ""))
      )
    ) {
      Object.assign(errorObject, { creditCard: "Invalid credit card number" });
    }
    if (!json.fname) {
      Object.assign(errorObject, { name: "Invalid name" });
    } else {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
      };
      const reg = /[&<>"'/]/gi;
      json.fname = json.fname.replace(reg, (match) => map[match]);
    }
    if (!json.lname) {
      Object.assign(errorObject, { surname: "Invalid name" });
    } else {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
      };
      const reg = /[&<>"'/]/gi;
      json.lname = json.lname.replace(reg, (match) => map[match]);
    }
    if (!json.city) {
      Object.assign(errorObject, { city: "Invalid city name" });
    }
    if (!json.state) {
      Object.assign(errorObject, { state: "Invalid state name" });
    }
    if (!json.street) {
      Object.assign(errorObject, { street: "Invalid street name" });
    }
    if (!json.zip) {
      Object.assign(errorObject, { zip: "Invalid post code" });
    }
    if (!json.cvv || json.cvv.length != 3 || !cvvRegEx.test(json.cvv)) {
      Object.assign(errorObject, { cvv: "Invalid security code" });
    }
    if (
      !json.expiration ||
      !monthRegex.test(json.expiration.split("/")[0]) ||
      Number.parseInt(json.expiration.split("/")[1]) <=
        new Date().getFullYear() % 100
    ) {
      Object.assign(errorObject, { expiration: "Invalid expiration date" });
    }
    return errorObject;
  },
};
export default checkoutProcess;
