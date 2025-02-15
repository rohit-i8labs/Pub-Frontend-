'use client'
import React, {  useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from '@/components/admin/OverviewTab'
import { PubsTab } from '@/components/admin/PubsTab'
import { UsersTab } from '@/components/admin/UsersTab'
import { RevenueTab } from '@/components/admin/RevenueTab'
import { ActivityTab } from '@/components/admin/ActivityTab'
export default function PubChatPlatformOwnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
useEffect(() => {

})
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">PubChat Platform Owner Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
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
          {/* <Register /> */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

