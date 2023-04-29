import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // original function
  // const cartItems = getLocalStorage("so-cart");
  // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // end original function.
  // original function feedback: caught TypeError: Cannot read properties of null (reading 'map')    at renderCartContents (cart.js:6:31)    at cart.js:51:1      r

  // Julie's single take calling function on a single storage item, Take 42
  // const cartItems = getLocalStorage("so-cart-2");
  // const carthing = cartItemTemplate(cartItems);
  // document.querySelector(".product-list").innerHTML += carthing;
  // end take 42, works but no image for so-cart-0.

  // Julie's double take calling function on a single storage item, Take 43
  // const cartItem1 = getLocalStorage("so-cart-1");
  // const cartItem2 = getLocalStorage("so-cart-2");
  // const cartItem3 = getLocalStorage("so-cart-3");
  // const cartItem4 = getLocalStorage("so-cart-4");
  // const cartList = [cartItem1, cartItem2, cartItem3, cartItem4];
  // const htmlItems = cartList.map((item) => cartItemTemplate(item));
  // document.querySelector(".product-list").innerHTML += htmlItems;
  // end take 43, works! Missing the image of Talus Tent for some reason.

  // Julie's Take 57!
  // const regexp = /^so-cart-/;
  // const cartItems = getLocalStorage(regexp);
  // const cartList = [];
  // cartList.push(cartItems);
  // const htmlItems = cartList.map((item) => cartItemTemplate(item));
  // document.querySelector(".product-list").innerHTML += htmlItems;
  // end take 57, doesn't work.

  // Julie's Take 58
  // const cartList = [];
  // let keys = Object.keys(localStorage);
  // for(let key of keys) {
  //   cartList.push(localStorage.getItem(key));
  // }
  // const htmlItems = cartList.map((item) => cartItemTemplate(item));
  // document.querySelector(".product-list").innerHTML += htmlItems;
  // didn't work

  // Julie's Take 59
  // const cartList = [];
  // for(let i = 0; i < localStorage.length; i++) {
  //   let key = localStorage.key(i);
  //   cartList.push(localStorage.getItem(key));
  // }
  // const htmlItems = cartList.map((item) => cartItemTemplate(item));
  // document.querySelector(".product-list").innerHTML += htmlItems;
  // didn't work

  // Julie's Take 60
  const cartList = [];
  for (let i = 0; i < localStorage.length; i++) {
    const keyName = `so-cart-${i}`;
    const cartItem = getLocalStorage(keyName);
    cartList.push(cartItem);
  }
  const htmlItems = cartList.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML += htmlItems;
  // WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // the image for Talus Tent is still broken, and not sure why. Also the links are only set at "#"
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.NameWithoutBrand}"
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

renderCartContents();
