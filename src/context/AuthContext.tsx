"use client";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<{
    username: string;
    setUsername: (username: string) => void;
    token: string | null;
    setToken: (token: string | null) => void;

}>({
    username: '',
    setUsername: () => { },
    token: null,
    setToken: () => { },
});

const useAuth = () => useContext(AuthContext);
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);

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