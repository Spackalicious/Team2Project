import {findProductById} from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, loadHeaderFooter } from "./utils.mjs";

let product = {};

export default async function productDetails(productId){
    product = await findProductById(productId);
  
    if(product == null){
        const prodName = document.querySelector("#productName");
        prodName.innerText = "Sorry, no product was not found.";
        prodName.style.color = "#840808";
        prodName.style.textAlign = "center";
        document.querySelector("#addToCart").style.display = "none";
    } else{
        renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", () => addToCart());
    }


}

export function addToCart() {
        let cart = getLocalStorage("so-cart") || [];
        cart.push(product);
        setLocalStorage("so-cart", cart);
        // Add total count
        let cartCount = getLocalStorage("cart-count") || 0;
        cartCount++;
        setLocalStorage("cart-count", cartCount);
        document.querySelector("#cart-count").textContent = cartCount;
        document.querySelector("#cart-count-container").className = "count-container-format"
}

function renderProductDetails(){
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}

loadHeaderFooter();