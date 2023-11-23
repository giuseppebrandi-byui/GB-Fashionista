// import { loadHeaderFooter, getParam } from "./utils.mjs";
// import productList from "./productList.mjs";
// loadHeaderFooter();
// const category = getParam("category");
// productList(".product-fullList", category);

import { loadHeaderFooter } from "./utils.mjs";
import getAllProducts from "./productListAll.mjs";
loadHeaderFooter();
getAllProducts();
