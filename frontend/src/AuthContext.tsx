import { createContext, useContext, useState } from "react";

// Source: https://fireship.dev/react-router-protected-routes-authentication

const AuthContext = createContext({});

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return {
        isAuthenticated,
        signup() {
            return new Promise((res) => {
                setIsAuthenticated(true);
                res({});
            })
        },
        login() {
            return new Promise((res) => {
                setIsAuthenticated(true);
                res({});
            })
        },
        logout() {
            return new Promise((res) => {
                setIsAuthenticated(false);
                res({});
            })
        }
    };
}

export function AuthProvider({children}: any) {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export default function UserAuth() {
    return useContext(AuthContext);
}