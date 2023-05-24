import { getLocalStorage, renderList } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  if(cartItems != null){
    renderList(cartItemTemplate, outputEl, cartItems);  

    const removeButtons = document.querySelectorAll(".cart-remove-button");
    removeButtons.forEach(button => {
      button.addEventListener("click", event => {
        alert("Button clicked: " + event.target.dataset.id);
      })
    })       
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

  <button class="cart-remove-button" data-id="${item.Id}">X</button>
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