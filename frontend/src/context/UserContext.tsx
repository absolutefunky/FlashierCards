import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
    userId: number | null;
    setUserId: (id: number | null) => void;
}

const UserContext = createContext<UserContextType>({ userId: null, setUserId: () => {} });

export function UserProvider({ children }: { children: ReactNode }) {
    const [userId, setUserId] = useState<number | null>(() => {
        const stored = localStorage.getItem("userId");
        return stored ? parseInt(stored) : null;
    });

    function handleSetUserId(id: number | null) {
        setUserId(id);
        if (id === null) localStorage.removeItem("userId");
        else localStorage.setItem("userId", String(id));
    }

    return (
        <UserContext.Provider value={{ userId, setUserId: handleSetUserId }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
