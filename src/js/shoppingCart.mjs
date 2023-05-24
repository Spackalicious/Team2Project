import { getLocalStorage, renderList } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  if(cartItems != null){
    renderList(cartItemTemplate, outputEl, cartItems); 
    // document.querySelector(".cart-remove-button").addEventListener("click", removeFromCart);   
    // document.querySelector(".buttonInner").addEventListener("click", removeFromCart);  
    cartItems.forEach(removeButton);  
       
  }
  
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider"
  >
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>

  <button class="cart-remove-button"><p class="buttonInner" data-id="${item.Id}">X</p></button>
</li>`;

  return newItem;
}

export function cartTotal() {
    const cartItemsTotal = document.querySelector(".cart-total");
    const itemsInCart = getLocalStorage("so-cart");
  
    let cartTotalCost = 0;
    let roundedCartTotalCost;

    function addPrices(price) {
      cartTotalCost += price;
      roundedCartTotalCost = cartTotalCost.toFixed(2);
    }
  
    if (itemsInCart != null) {
      const itemPrices = itemsInCart.map((item) => item.FinalPrice);
      itemPrices.forEach(addPrices);
      cartItemsTotal.append(` $${roundedCartTotalCost}`);
      // cartItemsTotal.style.display = "inline";
      cartItemsTotal.style.display = "flex";
      cartItemsTotal.style.flex = "1";
    }
  }

function removeButton() {
  // document.querySelector(".buttonInner").addEventListener("click", removeFromCart);
  document.querySelector(".cart-remove-button").addEventListener("click", removeFromCart);
}

function removeFromCart() {
  const buttonNum = document.querySelector(".buttonInner");
  // const buttonNum = this.querySelector(".buttonInner");
  // const dataId = buttonNum.attr("data-id");
  const dataId = buttonNum.getAttribute("data-id");
  // const dataId = buttonNum.dataset.id;
  alert(dataId);
}

  