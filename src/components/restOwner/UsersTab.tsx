"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { customersIdAndUsernames } from "@/_ApiCall/restaurant"
import { UserInterface } from '@/interfaces/User'


export default function UsersTab() {
  const [selectedUser, setSelectedUser] = useState<UserInterface[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await customersIdAndUsernames();
      setSelectedUser(users);
    }
    fetchUsers();
  }, [])

  return (
    <Card className="col-span-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <CardTitle>User Management</CardTitle>
        <CardDescription className="text-amber-100">View and interact with your customers</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[400px]">
          {selectedUser.map((user) => (
            <div key={user.id} className="flex items-center justify-between mb-4 p-4 hover:bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg transition-all duration-300">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 border-2 border-amber-300">
                  <AvatarImage src={``} alt={user.username} />
                  <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="font-semibold text-amber-900">{user.username}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

