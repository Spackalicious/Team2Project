import productList from "./productList.mjs";
import { loadHeaderFooter, getParam, breadcrumbs } from "./utils.mjs";

const category = getParam("category");
const sort = getParam("sort");
const search = getParam("search");

productList(".product-list", category, sort, search || null);
breadcrumbs(category, search);
loadHeaderFooter();
