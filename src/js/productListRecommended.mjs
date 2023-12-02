import { getProductByCategory } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { productCardTemplate } from "./productListDisplay.mjs";

var products = [];

export default async function getRecommendProducts(category) {
  let selectedCategories = ["jewelery", "men's clothing", "women's clothing"];
  selectedCategories.splice(selectedCategories.indexOf(category), 1);
  for (let i = 0; i < selectedCategories.length; i++) {
    const selectedCategory = await getProductByCategory(selectedCategories[i]);
    products = products.concat(selectedCategory);
  }

  let threeProductsOnly = [];
  while (threeProductsOnly.length < 3) {
    let randomInt = getRandomInt(products.length);
    if (threeProductsOnly.indexOf(randomInt) == -1) {
      threeProductsOnly.push(randomInt);
    }
  }

  filterProducts(
    new Array(
      products[threeProductsOnly[0]],
      products[threeProductsOnly[1]],
      products[threeProductsOnly[2]]
    )
  );
}

export function filterProducts(threeProductsOnly) {
  const el = document.querySelector(".recommended-products");
  renderListWithTemplate(productCardTemplate, el, threeProductsOnly);
}

// It gets a random integer from zero to max
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
