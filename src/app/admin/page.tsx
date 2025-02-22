'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  OverviewTab,
  PubsTab,
  UsersTab,
  RevenueTab,
  ActivityTab,
  RegisterPubTab,
} from '@/components/admin/index'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/UserAuthContext'
import { logout } from '@/lib/logout'
export default function PubChatPlatformOwnerDashboard() {
  const {
    setId,
    setEmail,
    setUsername
  } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const handleLogout = async () => {
    // Clear the user data from from context 
    setId('')
    setEmail('')
    setUsername('')

    // clear cookies
    await logout()
  }
  return (
    <div className='bg-gray-100 min-h-screen p-6'>
      <div className="container mx-auto p-4 ">
        <Button
          className="mb-4 float-right"
          variant="outline"
          onClick={handleLogout}
        >Logout</Button>
        <h1 className="text-3xl font-bold mb-6">PubChat Platform Owner Dashboard</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 sm:grid-cols-3 sm:mb-10 gap-2">
            <TabsTrigger value="overview" >Overview</TabsTrigger>
            <TabsTrigger value="pubs">Pubs</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="registerPub">Register Pub</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="pubs">
            <PubsTab />
          </TabsContent>
          <TabsContent value="users">
            <UsersTab />
          </TabsContent>
          <TabsContent value="revenue">
            <RevenueTab />
          </TabsContent>
          <TabsContent value="activity">
            <ActivityTab />
          </TabsContent>
          <TabsContent value="registerPub">
            <RegisterPubTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

