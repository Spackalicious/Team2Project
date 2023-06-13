// import { getProductsByCategory, findProductById } from "./externalServices.mjs";
import { findProductById } from "./externalServices.mjs";
// import productList from "./productList.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export function renderList(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
){
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback, 
  position = "afterbegin",
  clear = true
){
  // get template using function... no need to loop this time.
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if(callback) {
      callback(data);
  }
}

function loadTemplate(path) {
  // make a fetch request to the path
  return async function () {
    const res = await fetch(path);
    // process response as text
    if (res.ok) {
      const html = await res.text();
    // return HTML string
    return html;
    }
  };
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) {
    window.scrollTo(0, 0);
  }
}

export function breadcrumbs(category) {
  // Breadcrumbs to product list pages
  // hard coded each product count :/ 
  // const category = window.location.search;
  // const categoryTrimmed = category.slice(10);
  const categoryCapped = category[0].toUpperCase() + category.substring(1);
  let itemCount = 0;
  if (categoryCapped == "Tents") {
    itemCount = 24;
  } else if (categoryCapped == "Sleeping-bags") {
    itemCount = 15;
  } else if (categoryCapped == "Backpacks") {
    itemCount = 15;
  } else if (categoryCapped == "Hammocks") {
    itemCount = 13;
  }
    
  const breadcrumbText = categoryCapped + " >> (" + itemCount + " items)";
  document.querySelector(".breadcrumbs").innerHTML = breadcrumbText;
}

export async function moreBreadcrumbs() {
  // Shows product category with link back to 
  //  product category list on each product page
  const category = window.location.search;
  const categoryTrimmed = category.slice(9);
  const thing = await findProductById(categoryTrimmed);
  const breadText = thing.Category;
  const categoryCapped = breadText[0].toUpperCase() + breadText.substring(1);
  document.querySelector(".breadcrumb-individual").innerHTML = `<a class="breadLink" href="/product-list/index.html?category=${breadText}">${categoryCapped}</a>`;
}

export async function loadHeaderFooter() {
  // Load header and footer templates in from partials (loadTemplate)
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  // Grab header/footer elements out of DOM
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  // Render header and footer (renderWithTemplate)
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
  // update cart count
  window.addEventListener("load", () => {
    const cartCountEl = document.querySelector("#cart-count");
    cartCountEl.textContent = getLocalStorage("so-cart").length || "";
    if(getLocalStorage("so-cart").length > 0){
      const cartCountContainer = document.querySelector("#cart-count-container");
      cartCountContainer.className = "count-container-format";
    }
  })
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}