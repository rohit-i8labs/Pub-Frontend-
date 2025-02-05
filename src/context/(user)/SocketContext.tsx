"use client";
import React, { createContext, useContext, useState } from "react";


const SocketContext = createContext<{
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
}>({
  socket: null,
  setSocket: () => { },
});
const useSocket = () => useContext(SocketContext);

// Socket Provider Component
const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  return <SocketContext.Provider value={{ socket, setSocket }}>
    {children}
  </SocketContext.Provider>;
};

export { SocketProvider, useSocket };
