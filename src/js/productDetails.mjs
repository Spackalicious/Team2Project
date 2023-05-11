import {findProductById} from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId){
    product = await findProductById(productId);
  
    if(product == null){
        const prodName = document.querySelector("#productName");
        prodName.innerText = "Sorry, no product was not found.";
        prodName.style.color = "#840808";
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
  }

function renderProductDetails(){
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}

