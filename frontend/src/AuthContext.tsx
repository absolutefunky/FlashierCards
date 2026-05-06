import { createContext, useContext, useState } from "react";

// this component is used to authenticate user in the frontend

const AuthContext = createContext<any>(null);

export function AuthProvider({children}: any) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    function register(token: string) {
        return new Promise((res) => {
            setToken(token);
            setIsAuthenticated(true);
            res({});
        });
    }

    function logout() {
        return new Promise((res) => {
            setToken(null);
            setIsAuthenticated(false);
            res({});
        });
    }
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, token, register, logout }}>
            {children}
        </AuthContext.Provider>
    );   
}

export default function UserAuth() {
    return useContext(AuthContext);
}