import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../..";

const useAuth = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    return user && user.loggedIn;
}

const ProtectedRoutes = () => {

    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default ProtectedRoutes;