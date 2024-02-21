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
        navigate('/');
        navigate(0);
    }

    return {logout};
}

export default useLogout;