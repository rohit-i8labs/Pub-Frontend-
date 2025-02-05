"use client"
import React, { useState, useEffect, useRef } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-react'
import { useAuth } from '@/context/(user)/CustomerAuthProvider'
import { MessageInterface } from '@/interfaces/Messsage'
import { useSocket } from '@/context/(user)/SocketContext'
import { useChat } from '@/context/(user)/ChatProvider'
import { fetchChatId, chatHistory } from '@/_ApiCall/chat'
import { createPrivateSocket } from '@/_ApiCall/socket'

function ChatLayout() {
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [inputText, setInputText] = useState('')
  const { username, token } = useAuth()
  const { activeChat } = useChat();
  const { socket, setSocket } = useSocket();
  const socketRef = useRef<WebSocket | null>(null); // Store WebSocket instance

  const handleSocketConnection = async (ChatId: string) => {
    if (!ChatId || !token) return

    const ws = await createPrivateSocket(token, ChatId)
    socketRef.current = ws;
    setSocket(ws);
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

  }
  const getChatMessages = async (ChatId: string) => {
    const prevChat: MessageInterface[] = await chatHistory(token, ChatId)
    if (Array.isArray(prevChat)) {
      setMessages(prevChat)
    }
  }


  useEffect(() => {
    if (activeChat) {
      fetchChatId(token, username, activeChat).then((ChatId) => {
        if (ChatId) {
          handleSocketConnection(ChatId)
          getChatMessages(ChatId)
        }
      })
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        setSocket(null);
      }
    }
  }, [])


  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ message: inputText }))
      }
      setInputText('')
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl shadow-md transition-all duration-300 p-4 space-y-4">
      <div className="bg-white/80 backdrop-blur-sm p-3 text-center font-semibold text-fuchsia-800 border-b border-fuchsia-200">
        Chat with {activeChat}
      </div>

      {/* Message Display Section */}
      <div className="flex-1 min-h-[300px] max-h-[400px] overflow-y-auto">
        <ScrollArea className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${msg.sender_username === username ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-lg transition-all duration-300 ${msg.sender_username === username
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                  : 'bg-white text-fuchsia-800'
                  } hover:shadow-xl`}
              >
                <p className="font-semibold">{msg.sender_username === username ? 'You' : msg.sender_username}</p>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Input Section */}
      <div className="p-4 bg-white/90 backdrop-blur-md border-t border-fuchsia-200 rounded-b-2xl shadow-sm">
        <div className="flex items-center space-x-3">
          <Input
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            // disabled={!isValidated}
            className="flex-1 border-fuchsia-300 focus:border-fuchsia-500 focus:ring-fuchsia-500 rounded-full transition-all duration-300"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            // disabled={!isValidated}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 rounded-full transition-all duration-300"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}


export default ChatLayout