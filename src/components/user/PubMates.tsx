import React, { useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MessageSquare } from 'lucide-react'
import { customersIdAndUsernames } from "@/_ApiCall/restaurant"
import { UserInterface } from '@/interfaces/User'
import { useAuth } from '@/context/(user)/CustomerAuthProvider'
import { useChat } from '@/context/ChatProvider'

export default function PubMates() {
  const { username } = useAuth()
  const {onStartChat } = useChat()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([])

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const details = await customersIdAndUsernames();
      const filteredDetails: UserInterface[] = details.filter((user: UserInterface) => user.username !== username);
      setFilteredUsers(filteredDetails);
    };
    fetchCustomerDetails();    
  }, []);

  // const handleSearch = () => {
  //   const lowercaseTerm = searchTerm.toLowerCase()
  //   const filtered = mockUsers.filter(user =>
  //     user.name.toLowerCase().includes(lowercaseTerm) ||
  //     user.interests.some(interest => interest.toLowerCase().includes(lowercaseTerm))
  //   )
  //   setFilteredUsers(filtered)
  // }



  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Search by name or interest"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow rounded-full border-fuchsia-300 focus:border-fuchsia-500 focus:ring-fuchsia-500"
        />
        <Button 
        // onClick={handleSearch}
         size="icon" className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        {filteredUsers.map((user) => (
          <div key={user.id} className="flex items-center mb-4 p-3 hover:bg-fuchsia-100 rounded-xl transition-all duration-300 animate-fade-in-up">
            <Avatar className="h-12 w-12 border-2 border-fuchsia-300">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-grow">
              <p className="font-medium text-fuchsia-900">{user.username}</p>
            </div>
            <Button
              onClick={() => onStartChat(user.username)}
              size="icon" variant="ghost" className="text-fuchsia-600 hover:text-fuchsia-800 hover:bg-fuchsia-100 rounded-full transition-all duration-300">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

