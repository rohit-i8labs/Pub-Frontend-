"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart2, MessageSquare, QrCode, Settings, Users } from "lucide-react"
import { useRouter} from 'next/navigation'
function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("/");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/restaurant${tab}`);
  };
  useEffect(() => {
    handleTabChange("/")
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Restaurant Owner Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your restaurant with ease</p>
        </header>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
          <TabsList
            className="inline-flex bg-white p-1 rounded-lg shadow-md"
          >
            <TabsTrigger
              value="/"
              className="px-4 py-2 rounded-md transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
            >
              <BarChart2 className="mr-2 h-5 w-5" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="/analytics"
              className="px-4 py-2 rounded-md transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
            >
              <BarChart2 className="mr-2 h-5 w-5" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="/chatgroup"
              className="px-4 py-2 rounded-md transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat Group
            </TabsTrigger>
            <TabsTrigger
              value="/users"
              className="px-4 py-2 rounded-md transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              <Users className="mr-2 h-5 w-5" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="/qrcode"
              className="px-4 py-2 rounded-md transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white"
            >
              <QrCode className="mr-2 h-5 w-5" />
              QR Code
            </TabsTrigger>
            <TabsTrigger
              value="/settings"
              className="px-4 py-2 rounded-md transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className='mt-8 space-y-8'>{children}</div>
      </div>
    </div>
  )
}

export default Layout