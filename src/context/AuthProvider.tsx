"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
    username?: string | null;
    setUsername?: (username: string | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
}>({
    username: null,
    setUsername: () => { },
    token: null,
    setToken: () => { },
});

const useAuth = () => useContext(AuthContext);
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token && token !== null) {
    //         setToken(token);
    //         router.replace("/admin")

    //     } else {
    //         setToken(null);
    //         router.replace("/admin/login")
    //     }
    // }, []);
    return (
        <AuthContext.Provider value={{
            username,
            setUsername,
            token,
            setToken,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuth };