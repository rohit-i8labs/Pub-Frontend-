import React from 'react'
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

function page() {
  return (
    <Card className="col-span-4 bg-white shadow-lg rounded-lg overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
      <CardTitle>Restaurant Chat Group</CardTitle>
      <CardDescription className="text-cyan-100">Monitor ongoing conversations in your restaurant</CardDescription>
    </CardHeader>
    <CardContent className="p-6">
      <div className="flex items-center mb-4 p-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg">
        <Avatar className="h-16 w-16 border-4 border-white shadow-md">
          <AvatarImage src={``} alt="Chat Group" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <p className="text-xl font-semibold text-blue-800">Main Chat Group</p>
          <p className="text-sm text-blue-600">42 participants • 156 messages today</p>
        </div>
        <Progress value={75} className="ml-auto w-[120px]" />
      </div>
      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">View Chat History</Button>
    </CardContent>
  </Card>
  )
}

export default page