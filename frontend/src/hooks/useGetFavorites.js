import { useState } from "react";
import { httpGetFavorites } from "./requests";

const useGetFavorites = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getUserFavorites = async (user) => {
        try {
            setLoading(true);
            setError(false);
            const response = await httpGetFavorites(user.token);
            if(!response.ok){
                throw response.error;
            }
            setLoading(false)
            
            return response.data;

        } catch (error) {
            console.log(error)
            setError(true);
            setLoading(false);
        }
    }

    return { getUserFavorites, error, loading }
}

export default useGetFavorites;