import { getLocalStorage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  // convert response body to JSON
  // const jsonResponse = res.body;
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    // if not OK, send response body on in the throw stmnt
    throw { name: "servicesError", message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function getAllProducts(){
  const categories = ["tents", "hammocks", "sleeping-bags", "backpacks"];
  const promises = categories.map(category => getProductsByCategory(category));
  const results = await Promise.all(promises);
  const allProducts = results.reduce((accumulator, current) => accumulator.concat(current), []);
  return allProducts;  
}

export async function getProductsBySearch(search){
  var filteredProducts = [];
  if(search != null){
    const allProducts = await getAllProducts();
    filteredProducts = allProducts.filter(product => product.Name.toLowerCase().includes(search.toLowerCase()));
  }
  return filteredProducts;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout", options).then(convertToJson);
}

export async function loginRequest(creds){
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  return response.accessToken;
}

export async function createUser(userCreds){
  const userOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${getLocalStorage("so-token")}`
      "Authorization": `Bearer ${getLocalStorage("so-token")}`
    },
    body: JSON.stringify(userCreds)
  };
  localStorage.setItem("newUser", userCreds.email);
  return await fetch(baseURL + "users", userOptions)
  .then(convertToJson);  
}

export async function getOrders(){
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getLocalStorage("so-token")}`
    }
  };
  return await fetch(baseURL + "orders", options).then(convertToJson);
}