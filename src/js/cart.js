import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelector("#removeFromCart").addEventListener("click", () => remove());
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
  <div"></div>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>    
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>    
    <p class="cart-card__quantity">qty: 1</p>   
    <p class="cart-card__price">$${item.FinalPrice}</p>

    <button id="removeFromCart" data-id="${item.Id}" style="margin:-50px 0 10px 300px;">X</button>    
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

  if (itemsInCart != null) {
    const itemPrices = itemsInCart.map((item) => item.FinalPrice);
    itemPrices.forEach(addPrices);
    cartItemsTotal.append(`$${cartTotalCost}`);
    cartItemsTotal.style.display = "inline";
  } else {
    cartItemsTotal.style.display = "none";
  }
}

function remove(item) {
  let cartList = getLocalStorage("so-cart") || [];
  // console.log(cartList);
  
  // let itemToRemove = cartList.find(cartList.ID == productID);
  // cartList.pop(productID);

  console.log(cartList);
  

  // document.querySelector("#removeFromCart").addEventListener("click", function() {
    let productID = item.getAttribute("data-id");
    // console.log(`This is the product ID to remove: ${productID}`);
    cartList.pop(productID);
    setLocalStorage("so-cart", cartList);

    // pull id of item, pull contents of cart, remove item, restore cart in localStorage.
    // vv this doesn't do that.
    // localStorage.removeItem(cartList[productID]);
  // })
  
  // function removeFromCart() {
  //   let cart = getLocalStorage("so-cart") || [];
    
  // }
}

renderCartContents();
cartTotal();
remove();
