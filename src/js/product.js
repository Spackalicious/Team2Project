import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }
// Original above ^^, trying to make it so that it creates new entries below vv
function addProductToCart(product) {
  var i = localStorage.length;
  var keyname = "so-cart-" + [i];
  setLocalStorage(keyname, product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
