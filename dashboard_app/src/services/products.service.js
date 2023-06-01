const BASE_PRODUCTS_URL_API = "http://localhost:3000/api/products"

export const getProducts = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/products");
        const json = await response.json();
        return json;
        
    } catch (error) {
        console.error("Error while fetching products");
        return Promise.reject("Error while fetching products")
    }
}