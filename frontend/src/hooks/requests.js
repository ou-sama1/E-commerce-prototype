const baseUrl = "http://localhost:8000";

async function httpGetProducts(){
    const response = await fetch(`${baseUrl}/products`);
    const data = await response.json();
    return data;
};

async function httpGetProduct(id){
    const response = await fetch(`${baseUrl}/products/${id}`);
    const data = await response.json();
    return data;
};

async function httpAuthenticate(user, mode){
    try {
        const response = await fetch(`${baseUrl}/${mode}`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user),
        })

        if(!response.ok){
            throw response;
        }
        
        const data = await response.json();
        return {ok : true, data};

    } catch (error) {
        if (error instanceof Response) {
            // Handling the error based on whether it was from the response or not
            const errorData = await error.json();
            return { ok: false, error: errorData.error };
        } else {
            // If the error is not a Response object, it might be a network error or something else
            return { ok: false, error : "something went wrong, please check your connection."};
        }
    }
}

async function httpGetFavorites(token){
    try {
        const response = await fetch(`${baseUrl}/favorites`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'authorization' : `Bearer ${token}`
            },
        })
        if(!response.ok){
            throw response;
        }
        const data = await response.json();
        return {ok : true, data};
    } catch (error) {
        if (error instanceof Response) {
            // Handling the error based on whether it was from the response or not
            const errorData = await error.json();
            return { ok: false, error: errorData.error };
        } else {
            // If the error is not a Response object, it might be a network error or something else
            return { ok: false, error : "something went wrong, please check your connection."};
        }
    }
}

async function httpAddToFavorites(id, token){
    try {
        const response = await fetch(`${baseUrl}/favorites`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'authorization' : `Bearer ${token}`
            },
            body : JSON.stringify({id}),
        })
        
        if(!response.ok){
            throw response;
        }
        return {ok : true};

    } catch (error) {
        if (error instanceof Response) {
            // Handling the error based on whether it was from the response or not
            const errorData = await error.json();
            return { ok: false, error: errorData.error };
        } else {
            // If the error is not a Response object, it might be a network error or something else
            return { ok: false, error : "something went wrong, please check your connection."};
        }
    }
}

export {
    httpGetProducts,
    httpGetProduct,
    httpAuthenticate,
    httpAddToFavorites,
    httpGetFavorites,
}