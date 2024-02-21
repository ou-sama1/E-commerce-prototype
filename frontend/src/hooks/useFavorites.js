import { useState } from "react";
import { useSelector } from "react-redux";
import { httpAddToFavorites } from "./requests";

const useFavorites = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const user = useSelector(state => state.user.user);

    const HandleFavorites = async (id) => {
        try {
            setIsLoading(true);
            setIsError(false);
            if(!user){
                throw new Error('user not authenticated.');
            }
            const response = await httpAddToFavorites(id, user.token);
            if(!response.ok){
                throw new Error(response.error);
            }
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    }

    return { HandleFavorites, isError, isLoading }
}

export default useFavorites;