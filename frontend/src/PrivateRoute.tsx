import { Navigate, Outlet } from "react-router-dom";
import UserAuth from "./AuthContext";

const PrivateRoute = () => {
    const {isAuthenticated}: any = UserAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;