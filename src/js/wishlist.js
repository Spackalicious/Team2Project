import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import productListWish, { addWishToCart, removeFromWish } from "./shoppingWishlist.mjs";

const wishlist = getLocalStorage("so-wish");

productListWish(".product-list", wishlist);

loadHeaderFooter();

document.querySelectorAll(".addToCartWish").forEach((addBtn) => {
    addBtn.addEventListener("click", () => {
        addWishToCart(addBtn.dataset.wishadd)
    })
})

document.querySelectorAll(".removeFromWish").forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
        removeFromWish(removeBtn.dataset.wishremove)
    })
})