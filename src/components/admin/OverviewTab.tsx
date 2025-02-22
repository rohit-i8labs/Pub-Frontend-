import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Building, Users, DollarSign, MessageSquare } from 'lucide-react'
import api from '@/lib/axios'
interface PlatformOverview {
  totalPubs: number
  totalUsers: number
  totalRevenue: number
  activeChats: number
}
export default function OverviewTab() {
  const [platformOverview, setPlatformOverview] = useState<PlatformOverview>({
    totalPubs: 0,
    totalUsers: 0,
    totalRevenue: 0,
    activeChats: 0,
  })
  const [revenueData, setRevenueData] = useState<{ month: string; revenue: number }[]>([
    { month: 'Jan', revenue: 0 },
    { month: 'Feb', revenue: 0 },
    { month: 'Mar', revenue: 0 },
    { month: 'Apr', revenue: 0 },
    { month: 'May', revenue: 0 },
    { month: 'Jun', revenue: 0 },
  ])
  const [userGrowthData, setUserGrowthData] = useState<{ month: string; users: number }[]>([
    { month: 'Jan', users: 0 },
    { month: 'Feb', users: 0 },
    { month: 'Mar', users: 0 },
    { month: 'Apr', users: 0 },
    { month: 'May', users: 0 },
    { month: 'Jun', users: 0 },
  ])



  const getData = async () => {
    const response = await api.get('/superuser/')
    const data = response.data
    setPlatformOverview({
      totalPubs: data.restaurants.total_count || 0,
      totalUsers: data.customers.total_count || 0,
      totalRevenue: data.restaurants.total_revenue || 0,
      activeChats: data.private_chatrooms.total_count || 0
    })
    const revenueData = data.restaurants.monthly_counts
    if (revenueData.length>0) {
      setRevenueData(revenueData.map((item: any) => ({
        month: item.month,
        revenue: item.total_revenue
      })))
    }
    const usersData = data.customers.monthly_counts
    if (usersData.length>0) {
      setUserGrowthData(usersData.map((item: any) => ({
        month: item.month,
        users: item.count
      })))
    }
  }
  useEffect(() => {
    getData()
  }, [])


  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pubs</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformOverview.totalPubs}</div>
            {/* <p className="text-xs text-muted-foreground">+3 from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformOverview.totalUsers}</div>
            {/* <p className="text-xs text-muted-foreground">+12% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformOverview.totalRevenue}</div>
            {/* <p className="text-xs text-muted-foreground">+18% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformOverview.activeChats}</div>
            {/* <p className="text-xs text-muted-foreground">+8% from last week</p> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

