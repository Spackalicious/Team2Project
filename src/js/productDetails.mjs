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

    if (window.innerWidth < 300) {
        document.querySelector("#productImage").src = product.Images.PrimarySmall;
        // console.log("screen.width is " + window.innerWidth + "px");
    } else if (window.innerWidth < 600) {
        document.querySelector("#productImage").src = product.Images.PrimaryMedium;
        // console.log("screen.width is " + window.innerWidth + "px");
    } else if (window.innerWidth < 900) {
        document.querySelector("#productImage").src = product.Images.PrimaryLarge;
        // console.log("screen.width is " + window.innerWidth + "px");
    } else if (window.innerWidth > 900) {
        document.querySelector("#productImage").src = product.Images.PrimaryExtraLarge;
        // console.log("screen.width is " + window.innerWidth + "px");
    }
    document.querySelector("#productImage").alt = product.Name;

    const extraImages = document.querySelector("#extraImages");
    const origThumbnail = document.createElement("img");
    origThumbnail.src = product.Images.PrimarySmall;
    origThumbnail.addEventListener("click", () => {
        if (window.innerWidth < 300) {
            document.querySelector("#productImage").src = product.Images.PrimarySmall;
        } else if (window.innerWidth < 600) {
            document.querySelector("#productImage").src = product.Images.PrimaryMedium;
        } else if (window.innerWidth < 900) {
            document.querySelector("#productImage").src = product.Images.PrimaryLarge;
        } else if (window.innerWidth > 900) {
            document.querySelector("#productImage").src = product.Images.PrimaryExtraLarge;
        }
    })
    extraImages.append(origThumbnail);

    const productImages = product.Images.ExtraImages;
    productImages.forEach(extraImage => {
        const newImage = document.createElement("img");
        newImage.src = extraImage.Src;
        newImage.alt = extraImage.Title;
        newImage.addEventListener("click", () => {
            // document.querySelector("#productColorName").innerText = color.ColorName;
            document.querySelector("#productImage").src = newImage.src;
            document.querySelector("#productImage").alt = newImage.alt;
        })
        extraImages.append(newImage);
    });

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
    document.querySelector("#productFinalPrice").innerText = "$" + product.FinalPrice;
    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;    
}

loadHeaderFooter();