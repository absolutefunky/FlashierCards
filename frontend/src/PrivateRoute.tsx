import { Navigate, Outlet } from "react-router-dom";
import UserAuth from "./AuthContext";

// this component is used to protect private routes

const PrivateRoute = () => {
    const {isAuthenticated}: any = UserAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;