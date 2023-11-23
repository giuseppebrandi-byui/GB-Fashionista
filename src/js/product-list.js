import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";
// import { loadHeaderFooter, getParam } from "./utils.mjs";
// loadHeaderFooter();
const category = getParam("category");
console.log("Testing category: " + category);
productList(".product-fullList", category);

loadHeaderFooter();
