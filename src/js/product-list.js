import productList from "./productList.mjs";
import { loadHeaderFooter, getParam, breadcrumbs } from "./utils.mjs";

const category = getParam("category");

productList(".product-list", category);
breadcrumbs();
loadHeaderFooter();
