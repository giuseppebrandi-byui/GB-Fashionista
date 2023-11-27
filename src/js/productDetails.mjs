import { findProductById } from "./productData.mjs";

export async function renderProductDetails(productCategory, productId) {
  try {
    const selectedProduct = await findProductById(productCategory, productId);
    console.log(selectedProduct);
    document.querySelector("#productName").innerText = selectedProduct.title;
    document.querySelector("#productImage").src = selectedProduct.image;
    document.querySelector("#productImage").alt = selectedProduct.title;

    let decimalDigits = selectedProduct.price.toString().split(".")[1];
    console.log(decimalDigits);
    if (decimalDigits && decimalDigits.length < 2) {
      selectedProduct.price = selectedProduct.price.toString() + "0";
    }
    document.querySelector("#productFinalPrice").innerText =
      "$" + selectedProduct.price;
    selectedProduct.description = selectedProduct.description
      .toString()
      .replaceAll(".", ".\n");
    document.querySelector("#productDescriptionHtmlSimple").innerText =
      selectedProduct.description;

    const arrayRating = selectedProduct.rating.rate.toString().split(".");
    for (let i = 0; i < Number.parseInt(arrayRating[0]); i++) {
      document.querySelector(
        ".star-rating"
      ).innerHTML += `<ion-icon class="star-icon" name="star"></ion-icon>`;
    }

    if (Number.parseInt(arrayRating[1]) > 4)
      document.querySelector(
        ".star-rating"
      ).innerHTML += `<ion-icon class="star-icon" name="star-half"></ion-icon>`;
    document.querySelector(
      ".star-rating"
    ).innerHTML += `  <span class="num-ratings">(${selectedProduct.rating.count})</span>`;
  } catch (e) {
    console.log(e);
    document.querySelector(
      ".product-detail"
    ).innerHTML = `<class="featured-products products">
        <!-- Add something for user -->
        <h2 class="heading">Featured Products</h2>
        <div class="product-list container-md grid grid--2-cols">
          <div class="product-card">
            <a
              href="./index.html?category=men&#39;s%20clothing&&product=2"
            >
              <img
                class="product-img"
                src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                alt="Mens Casual Premium Slim Fit T-Shirts"
              />
              <h2 class="card__name">Mens Casual Premium Slim Fit T-Shirts</h2>
              <p class="product-card__price">$22.30</p></a
            >
          </div>

          <div class="product-card">
            <a href="./index.html?category=men&#39;s%20clothing&&product=1">
              <img
                class="product-img"
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                alt="Foldsack No. 1 Backpac"
              />
              <h2 class="card__name">
                Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
              </h2>
              <p class="product-card__price">$109.95</p></a
            >
          </div>

          <div class="product-card">
            <a href="./index.html?category=women&#39;s%20clothing&&product=15">
              <img
                class="product-img"
                src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
                alt="BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats"
              />
              <h2 class="card__name">
                BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats
              </h2>
              <p class="product-card__price">$56.99</p></a
            >
          </div>

          <div class="product-card">
            <a href="./index.html?category=women&#39;s%20clothing&&product=18">
              <img
                class="product-img"
                src="https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg"
                alt="MBJ Women's Solid Short Sleeve Boat Neck V"
              />
              <h2 class="card__name">
                MBJ Women's Solid Short Sleeve Boat Neck V
              </h2>
              <p class="product-card__price">$9.85</p></a
            >
          </div>
        </div>`;
  }
}
