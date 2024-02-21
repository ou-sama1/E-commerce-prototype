import { useCallback, useState } from "react";
import { httpGetProduct } from "./requests";

const useProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getProduct = useCallback( async (id) => {
        setLoading(true);
        setError(false);
        try {
            if(!(parseInt(id) >= 0)){
                throw new Error("invalid id");
            }
            
            const fetchedProduct = await httpGetProduct(id);
            
            if(fetchedProduct.error){
                throw new Error("item not found");
            }

            setLoading(false);
            return fetchedProduct;

        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }, [] );

    return {getProduct, loading, error};
}

export default useProduct;