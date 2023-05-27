import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const category = getParam("category");

productList(".product-list", category);
loadHeaderFooter();
