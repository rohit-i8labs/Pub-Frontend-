"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Gift, MessageSquare,  } from "lucide-react"


function page() {
    const [selectedUser, setSelectedUser] = useState<{ name: string; messagesSent: number; messagesReceived: number }| null>(null)
    const sendVoucherOrMessage = (type: 'Voucher' | 'Message') => {
      // In a real application, this would send a voucher or message to the selected user
     if(selectedUser){
      alert(`${type} sent to ${selectedUser?.name}!`)
     }
      setSelectedUser(null)
    }
  return (
    <Card className="col-span-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <CardTitle>User Management</CardTitle>
        <CardDescription className="text-amber-100">View and interact with your customers</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[400px]">
          {[
            { name: 'Alice', messagesSent: 23, messagesReceived: 19 },
            { name: 'Bob', messagesSent: 15, messagesReceived: 12 },
            { name: 'Charlie', messagesSent: 31, messagesReceived: 28 },
            { name: 'David', messagesSent: 8, messagesReceived: 5 },
            { name: 'Eva', messagesSent: 42, messagesReceived: 39 },
          ].map((user, index) => (
            <div key={index} className="flex items-center justify-between mb-4 p-4 hover:bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg transition-all duration-300">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 border-2 border-amber-300">
                  <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="font-semibold text-amber-900">{user.name}</p>
                  <p className="text-sm text-amber-600">
                    Sent: {user.messagesSent} • Received: {user.messagesReceived}
                  </p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setSelectedUser(user)} className="bg-gradient-to-r from-amber-400 to-orange-400 text-white hover:from-amber-500 hover:to-orange-500">Interact</Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-br from-amber-50 to-orange-50">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-amber-900">Interact with {selectedUser?.name}</DialogTitle>
                    <DialogDescription className="text-amber-700">Send a special voucher or message to this user.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Button onClick={() => sendVoucherOrMessage('Voucher')} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600">
                      <Gift className="mr-2 h-4 w-4" />
                      Send Special Voucher
                    </Button>
                    <Button onClick={() => sendVoucherOrMessage('Message')} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default page