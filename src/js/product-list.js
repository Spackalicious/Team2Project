import productList from "./productList.mjs";
import { loadHeaderFooter, getParam, breadcrumbs } from "./utils.mjs";

const category = getParam("category");
const sort = getParam("sort");

productList(".product-list", category, sort);
breadcrumbs(category);
loadHeaderFooter();
