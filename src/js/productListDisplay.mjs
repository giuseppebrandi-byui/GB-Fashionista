import { getProductByCategory } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

let products;

function productCardTemplate(product) {
  return `<li class="product-card">
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
          </li>`;
}

export async function displayElementsBySearchTerm() {
  const menClothing = await getProductByCategory("men's clothing");
  const jewelery = await getProductByCategory("jewelery");
  const womenClothing = await getProductByCategory("women's clothing");

  products = menClothing.concat(jewelery, womenClothing);
  const filterInput = document.querySelector("#filterInput");
  filterInput.addEventListener("keyup", filterProducts);
}

export function filterProducts() {
  const modal = document.querySelector("#myModal");
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const productListModal = document.querySelector(".product-list-header");
  renderListWithTemplate(productCardTemplate, productListModal, products);

  const productList = document.querySelector(".product-list-header");
  let filterValue = filterInput.value.toUpperCase();
  let item = productList.querySelectorAll(".product-card");
  for (let i = 0; i < item.length; i++) {
    let nameWithoutBrand = item[i].querySelector(".card__name");
    if (nameWithoutBrand.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      item[i].style.display = "initial";
    } else {
      item[i].style.display = "none";
    }
  }
}
