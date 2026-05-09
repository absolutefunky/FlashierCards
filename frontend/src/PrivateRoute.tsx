import { Navigate, Outlet } from "react-router-dom";
import UserAuth from "./AuthContext";

// this component is used to protect private routes

const PrivateRoute = () => {
    const {isAuthenticated} = UserAuth();
    const token = localStorage.getItem("token");

    // wait for refresh token
    if (!isAuthenticated && token) {
        return null;
    }

    // go home if user tries to access a route before authentication
    if (!isAuthenticated && !token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;