import { getParam, moreBreadcrumbs } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");

productDetails(productId);
moreBreadcrumbs();