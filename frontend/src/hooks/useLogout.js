import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLoggedOut } = userActions;

    const logout = () => {
        localStorage.removeItem('user');
        dispatch(userLoggedOut());
        navigate(0);
        navigate('/');
    }

    return {logout};
}

export default useLogout;