import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext({});

export const AuthContextProvider = ({children}: any) => {
    const [session, setSession] = useState(undefined);

    const signUpUser = async (email: string, password: string) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            return {success: false, error: error.message};
        }
        return {success: true, data};
    };

    const logInUser = async (email: string, password: string) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) {
            return {success: false, error: error.message}
        }
        return {success: true, data};
    };

    const signOutUser = async () => {
        const {error} = await supabase.auth.signOut();
        if (error) {
            return {success: false, error: error.message};
        }
        return {success: true};
    };

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}: any) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session: any) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{session, signUpUser, logInUser, signOutUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => useContext(AuthContext);