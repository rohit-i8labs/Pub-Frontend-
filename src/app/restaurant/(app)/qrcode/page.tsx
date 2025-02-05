"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  QrCode, RefreshCw} from "lucide-react"

function page() {
  const [restaurantName, setRestaurantName] = useState('The Tipsy Tavern')
  const [logo, setLogo] = useState('/placeholder.svg?height=100&width=100')
  const [qrCodeNumber, setQrCodeNumber] = useState('12345')
  const [qrCodeResetTime, setQrCodeResetTime] = useState(3600) // 1 hour in seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  const generateQRCode = () => {
    // In a real application, this would generate a new QR code
    setQrCodeNumber(Math.floor(10000 + Math.random() * 90000).toString())
    setQrCodeResetTime(3600) // Reset to 1 hour
  }
    useEffect(() => {
      const timer = setInterval(() => {
        setQrCodeResetTime((prevTime) => {
          if (prevTime <= 0) {
            // Reset QR code here in a real application
            return 3600 // Reset to 1 hour
          }
          return prevTime - 1
        })
      }, 1000)
  
      return () => clearInterval(timer)
    }, [])
  return (
    <Card className="col-span-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <CardTitle>QR Code Display</CardTitle>
        <CardDescription className="text-emerald-100">For customers to scan and join the chat app</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-8 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="flex items-center justify-center w-64 h-64 bg-white rounded-lg shadow-lg mb-6">
          <QrCode className="w-48 h-48 text-emerald-500" />
        </div>
        <div className="text-5xl font-bold mb-4 text-emerald-700">{qrCodeNumber}</div>
        <div className="text-2xl mb-6 text-emerald-600">Time until reset: {formatTime(qrCodeResetTime)}</div>
        <div className="flex items-center space-x-6 bg-white p-4 rounded-lg shadow-md">
          <Avatar className="h-20 w-20 border-4 border-emerald-200">
            <AvatarImage src={logo} alt={restaurantName} />
            <AvatarFallback>{restaurantName[0]}</AvatarFallback>
          </Avatar>
          <div className="text-2xl font-semibold text-emerald-800">{restaurantName}</div>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-emerald-100 to-green-100 p-6">
        <Button onClick={generateQRCode} className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 transition-all duration-300">
          <RefreshCw className="mr-2 h-5 w-5" />
          Generate New QR Code
        </Button>
      </CardFooter>
    </Card>
  )
}

export default page