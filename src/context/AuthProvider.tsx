"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
    token: string | null;
    setToken: (token: string | null) => void;
}>({
    token: null,
    setToken: () => { },
});

const useAuth = () => useContext(AuthContext);
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token !== null) {
            setToken(token);
            router.replace("/admin")

        } else {
            setToken(null);
            router.replace("/admin/login")
        }
    }, []);
    return (
        <AuthContext.Provider value={{
            token,
            setToken,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuth };