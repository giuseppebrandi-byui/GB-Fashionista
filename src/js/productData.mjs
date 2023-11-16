const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "jewelery") {
  if (!baseURL.endsWith("/")) {
    baseURL = baseURL + "/";
  }
  return fetch(baseURL + `products/category/${category}`).then(convertToJson);
}

export async function findProductById(category, id) {
  const products = await getData(category);
  return products.find(
    (item) => Number.parseInt(item.id) === Number.parseInt(id)
  );
}
