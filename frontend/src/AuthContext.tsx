import { createContext, useContext, useEffect, useState } from "react";

// this component is used to authenticate user in the frontend

const AuthContext = createContext<any>(null);

export function AuthProvider({children}: any) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    function register(token: string) {
        return new Promise((res) => {
            localStorage.setItem("token", token);
            setToken(token);
            setIsAuthenticated(true);
            res({});
        });
    }

    function logout() {
        return new Promise((res) => {
            localStorage.removeItem("token");
            setToken(null);
            setIsAuthenticated(false);
            res({});
        });
    }

    useEffect(() => {
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
            setToken(currentToken);
            setIsAuthenticated(true);
        }
        
    }, []);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, token, register, logout }}>
            {children}
        </AuthContext.Provider>
    );   
}

export default function UserAuth() {
    return useContext(AuthContext);
}