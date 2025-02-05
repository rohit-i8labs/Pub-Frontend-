"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CustomerAuthContext = createContext<{
    username: string;
    setUsername: (username: string) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    register: (data: any) => Promise<void>;

}>({
    username: "",
    setUsername: () => { },
    token: null,
    setToken: () => { },
    register: async () => { },

});

const useAuth = () => useContext(CustomerAuthContext);
const CustomerAuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [username, setUsername] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const register = async (data: {
        username: string;
        email: string;
        token_valid_hours: number
    }) => {
        try {
            const response = await axios.post("https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/customers/", data);
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setUsername(data.username);
            localStorage.setItem("username", data.username);
            router.replace("/user");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (token && token !== null && username && username !== null) {
            setToken(token);
            setUsername(username);
            router.replace("/user")
    
        } else {
            setToken(null);
            setUsername("");
            router.replace("/user/register")
        }
    }, []);

    const value = {
        username,
        setUsername,
        token,
        setToken,
        register
    }
    return (
        <CustomerAuthContext.Provider value={value}>
            {children}
        </CustomerAuthContext.Provider>
    );
}

export { CustomerAuthProvider, useAuth };