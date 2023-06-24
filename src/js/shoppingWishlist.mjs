import {getLocalStorage, renderList, setLocalStorage, alertMessage} from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";


// productList.mjs
function productCardTemplateWish(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
    <button class="addToCartWish" data-wishadd=${product.Id}>Add to Cart</button>
    <button class="removeFromWish" data-wishremove=${product.Id}>Remove</button>
  </li>`;
}             

export default async function productListWish(selector, data) {
    
    // get the element we will insert the list into from the selector
    const element = document.querySelector(selector);    
      
    renderList(productCardTemplateWish, element, data)
}

export async function addWishToCart(productId){
    const product = await findProductById(productId);
    let cart = getLocalStorage("so-cart") || [];
    cart.push(product);
    setLocalStorage("so-cart", cart);
    // Add display total in cart
    let cartCount = getLocalStorage("so-cart").length;
    document.querySelector("#cart-count").textContent = cartCount;
    document.querySelector("#cart-count-container").className = "count-container-format"

    alertMessage("Product Successfully Added to your Cart");

    let wishlist = getLocalStorage("so-wish");
    let index = wishlist.findIndex(prod => prod.Id === productId);
    if(index !== -1) {
        wishlist.splice(index, 1);
        setLocalStorage("so-wish", wishlist);
        window.location.reload();
    }
}

export function removeFromWish(productId){
    alertMessage("Product Successfully Added to your Cart");

    let wishlist = getLocalStorage("so-wish");
    let index = wishlist.findIndex(prod => prod.Id === productId);
    if(index !== -1) {
        wishlist.splice(index, 1);
        setLocalStorage("so-wish", wishlist);
        window.location.reload();
    }
}
