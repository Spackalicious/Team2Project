// import { getProductsByCategory, findProductById } from "./externalServices.mjs";
import { findProductById, getProductsByCategory, getProductsBySearch } from "./externalServices.mjs";
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

export async function breadcrumbs(category, search = null) {
  // Breadcrumbs to product list pages
  // hard coded each product count :/ 
  // const category = window.location.search;
  // const categoryTrimmed = category.slice(10);
  const categoryCapped = category[0].toUpperCase() + category.substring(1);
  let products = [];
  if(search != null){
    products = await getProductsBySearch(search);
  } else {
    products = await getProductsByCategory(category);
  }
  const itemCount = products.length;
  const breadcrumbText = categoryCapped + " >> (" + itemCount + " items)";
  document.querySelector(".breadcrumbs").innerHTML = breadcrumbText;
}

export async function moreBreadcrumbs(searched) {
  // Shows product category with link back to 
  //  product category list on each product page
  const category = window.location.search;
  const categoryTrimmed = category.slice(9);
  const thing = await findProductById(categoryTrimmed);
  let breadText = "";
  if(searched){
    breadText = "Search Results";
  } else{
    breadText = thing.Category;
  }
  const categoryCapped = breadText[0].toUpperCase() + breadText.substring(1);
  const breadcrumb = document.querySelector(".breadcrumb-individual")
  breadcrumb.innerHTML = `<p class="breadLink">${categoryCapped}</p>`;
  breadcrumb.addEventListener("click", () => {
    window.history.back();
  })
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
    // cart count
    const cartCountEl = document.querySelector("#cart-count");
    if(getLocalStorage("so-cart")){
      if(getLocalStorage("so-cart").length > 0){
        cartCountEl.textContent = getLocalStorage("so-cart").length;
        const cartCountContainer = document.querySelector("#cart-count-container");
        cartCountContainer.className = "count-container-format";
    }
    
    }
    // search bar
    const search = document.querySelector("#search-input");
    search.addEventListener("keyup", searchProducts);
    
  })
}

async function searchProducts(){
  // get the form 
  const searchForm = document.querySelector(".search-container form");
  // remove search results
  const displayResults = document.querySelector("#auto-results");
  displayResults.innerHTML = "";
  // get search element and value of current search
  const search = document.querySelector("#search-input");
  const searchValue = search.value;
  // filter product names compared to search value if the search value is not null
  if(searchValue != ""){
    const filteredProducts = await getProductsBySearch(searchValue);
    for (let index = 0; index < 5; index++) {
      const listItem = document.createElement("li");
      listItem.textContent = filteredProducts[index].Name;
      listItem.addEventListener("click", () => {
        search.value = filteredProducts[index].Name;
        displayResults.innerHTML = "";
        searchForm.submit();
      })
      displayResults.appendChild(listItem);
  }
  }

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}