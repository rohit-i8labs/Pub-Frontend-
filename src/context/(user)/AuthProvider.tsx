"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
    username: string;
    setUsername: (username: string) => void;
    token: string | null;
    setToken: (token: string | null) => void;
}>({
    username: "",
    setUsername: () => { },
    token: null,
    setToken: () => { },
});

const useAuth = () => useContext(AuthContext);
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [username, setUsername] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (token && token !== null && username && username !== null) {
            setToken(token);
            setUsername(username);
            router.replace("/admin")
    
        } else {
            setToken(null);
            setUsername("");
            router.replace("/admin/login")
        }
    }, []);

    const value = {
        username,
        setUsername,
        token,
        setToken,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuth };