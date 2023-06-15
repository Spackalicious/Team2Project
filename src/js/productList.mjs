import { getProductsByCategory, getProductsBySearch } from "./externalServices.mjs";
import {renderList} from "./utils.mjs";

let searched = null;

// productList.mjs
function productCardTemplate(product) {
    let searchParam = "";
    if(searched == true){
      searchParam = "&searched=true";
    }
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}${searchParam}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}             

export default async function productList(selector, category, sort, search) {
    
    // get the element we will insert the list into from the selector
    const element = document.querySelector(selector);
    // get the list of products 
    let products = [];
    if(search != null){
      searched = true;
      products = await getProductsBySearch(search);
    } else{
      products = await getProductsByCategory(category);
    }
    // render out the product list to the element
    const title = document.querySelector(".title");
    title.textContent = category[0].toUpperCase() + category.substring(1);
    // Add links to sorters
    switch(sort){
      case "price":
        products.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case "name":
        products.sort((a, b) => {
          const nameA = a.Name.toUpperCase();
          const nameB = b.Name.toUpperCase();
          if(nameA < nameB){
            return -1;
          }
          if(nameA > nameB){
            return 1;
          }

          return 0;
        })
        break;
      default:
        break;
    }
    let searchParam = "";
    if(search != null){
      searchParam = `&search=${search}`;
    }

    const sortByNameEl = document.querySelector("#nameSort");
    sortByNameEl.setAttribute("href", `/product-list/index.html?category=${category}` + searchParam + `&sort=name`);
    const sortByPriceEl = document.querySelector("#priceSort");
    sortByPriceEl.setAttribute("href", `/product-list/index.html?category=${category}` + searchParam + `&sort=price`);
    
    //element.innerHTML = products.name;
    //const htmlItems = products.map((item) => productCardTemplate(item));
    //element.innerHTML = htmlItems.join("");
    renderList(productCardTemplate, element, products)
}

