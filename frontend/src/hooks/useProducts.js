import { useCallback, useEffect, useState } from "react";
import { httpGetProducts } from "./requests";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(false);

    const getProducts = useCallback( async () => {
        setLoading(true);
        try {
            const fetchedProducts = await httpGetProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            setError(true);
        }
        setLoading(false);
        
    }, [] );

    useEffect(() => {
        getProducts();
    }, [getProducts])

    return {products, loading, error};
}

export default useProducts;