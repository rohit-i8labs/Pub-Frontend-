"use client";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<{
    _id: string;
    setId: (id: string) => void;
    email: string;
    setEmail: (email: string) => void;
    username: string;
    setUsername: (username: string) => void;
}>({
    _id: "",
    setId: () => {},
    email: "",
    setEmail: () => {},
    username: "",
    setUsername: () => {},

})

const useAuth = () => useContext(AuthContext);
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const [_id, setId] = useState<string>('');
        const [email, setEmail] = useState<string>('');
        const [username, setUsername] = useState<string>('');

        const value={
            _id,
            setId,
            email,
            setEmail,
            username,
            setUsername,
        }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuth };