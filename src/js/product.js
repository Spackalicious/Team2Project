import { getParam, moreBreadcrumbs } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
const searched = getParam("searched");

productDetails(productId);
moreBreadcrumbs(searched);