import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if(cartItems != null){
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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
</li>`;

  return newItem;
}

function cartTotal() {

  const cartItemsTotal = document.querySelector(".cart-total");
  const itemsInCart = getLocalStorage("so-cart");

  let cartTotalCost = 0; 
  function addPrices(price) {       
    cartTotalCost += price;
  }

  if(itemsInCart != null){    
    const itemPrices = itemsInCart.map((item) => item.FinalPrice);    
    itemPrices.forEach(addPrices);    
    cartItemsTotal.append(`$${cartTotalCost}`);
    cartItemsTotal.style.display = "inline";
  }
  else {
    cartItemsTotal.style.display = "none";  
  }
}

renderCartContents();
cartTotal();
