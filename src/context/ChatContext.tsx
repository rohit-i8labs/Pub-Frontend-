"use client"
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext<{
    activeChat: string;
    setActiveChat: (chat: string) => void;
    onStartChat: (userId: string) => void;
}>({
    activeChat: "",
    setActiveChat: () => { },
    onStartChat: () => { },
})

const useChat = () => useContext(ChatContext);

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeChat, setActiveChat] = useState("");
    const router = useRouter();

    const onStartChat = (userId: string) => {
        setActiveChat(userId);
        router.push(`/user/chat/${userId}`);

    };

    return <ChatContext.Provider value={{
        activeChat,
        onStartChat,
        setActiveChat
    }}>
        {children}
    </ChatContext.Provider>
}
export { ChatContext, useChat, ChatProvider };
