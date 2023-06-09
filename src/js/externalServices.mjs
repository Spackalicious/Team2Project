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