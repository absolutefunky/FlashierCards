import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

const PrivateRoute = ({children}: any) => {
    const {session}: any = UserAuth();

    return <div>{session ? <>{children}</> : <Navigate to="/" />}</div>
};

export default PrivateRoute;