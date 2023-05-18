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
}