import { useState } from "react";
import { httpAuthenticate } from './requests';
import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";

const useAuthenticate = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState('');
    const { userAutenticated } = userActions;
    const dispatch = useDispatch();

    const authenticate = async (user, mode, captchaValue) => {
        setLoading(true);
        setError('');
        let response;
        if(mode === 'signup'){
            response = await httpAuthenticate(user, 'signup', captchaValue);
        }
        else response = await httpAuthenticate(user, 'login');

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch(userAutenticated(response.data));
            setLoading(false);
        }
        else{
            setLoading(false);
            setError(response.error);
        }

        return response.ok;
    }

    return {authenticate, loading, error};
}

export default useAuthenticate;