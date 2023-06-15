import {findProductById} from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, loadHeaderFooter, alertMessage } from "./utils.mjs";

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
    // Add display total in cart
    let cartCount = getLocalStorage("so-cart").length;
    document.querySelector("#cart-count").textContent = cartCount;
    document.querySelector("#cart-count-container").className = "count-container-format"

    alertMessage("Product Successfully Added");
    }

function renderProductDetails(){
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = product.Name;
    const colors = document.querySelector("#colors");
    const productColors = product.Colors;
    productColors.forEach(color => {
        const newColor = document.createElement("img");
        newColor.src = color.ColorChipImageSrc;
        newColor.alt = color.ColorName;
        newColor.addEventListener("click", () => {
            document.querySelector("#productColorName").innerText = color.ColorName;
            document.querySelector("#productImage").src = color.ColorPreviewImageSrc;
            document.querySelector("#productImage").alt = color.ColorName;
        })
        colors.append(newColor);
    });
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}

loadHeaderFooter();