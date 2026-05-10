import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// this component is used to authenticate user in mobile

const AuthContext = createContext<any>(null);

export function AuthProvider({children}: any) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    async function register(token: string) {
        await AsyncStorage.setItem("token", token);
        setToken(token);
        setIsAuthenticated(true);
    }

    async function logout() {
        await AsyncStorage.removeItem("token");
        setToken(null);
        setIsAuthenticated(false);
    }

    async function loadRefreshToken() {
        const currentToken = await AsyncStorage.getItem("token");
        if (currentToken) {
            setToken(currentToken);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadRefreshToken();        
    }, []);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, token, register, logout }}>
            {children}
        </AuthContext.Provider>
    );   
}

export default function UserAuth() {
    return useContext(AuthContext);
}