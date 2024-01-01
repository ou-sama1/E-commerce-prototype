const baseUrl = "http://localhost:8000";

async function httpGetProducts(){
    const response = await fetch(`${baseUrl}/products`);
    const data = await response.json();
    return data;
};

export {
    httpGetProducts,
}