export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  return fetch(url)
    .then((response) => response.json())
    .then((data) => (data));
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlCategories = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const urlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  let url = '';
  if (categoryId) {
    url = urlCategories;
  } else if (query) {
    url = urlQuery;
  }
  return fetch(url)
    .then((response) => response.json())
    .then((data) => (data));
}
