import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import api from '@/lib/axios'

interface PlatformOverview {
  totalPubs: number
  totalUsers: number
  totalRevenue: number
  activeChats: number
}
export default function RevenueTab() {

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
    if (revenueData.length > 0) {
      setRevenueData(revenueData.map((item: any) => ({
        month: item.month,
        revenue: item.total_revenue
      })))
    }

  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Analytics</CardTitle>
        <CardDescription>Platform-wide revenue statistics and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium">Total Revenue (YTD)</span>
            <span className="text-2xl font-bold">${platformOverview.totalRevenue}</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium">Avg. Revenue per Pub</span>
            <span className="text-2xl font-bold">{
              platformOverview.totalPubs === 0 ? `$0` : `$${Math.round(platformOverview.totalRevenue / platformOverview.totalPubs)}`
              } </span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium">Avg. Revenue per User</span>
            <span className="text-2xl font-bold">{
              platformOverview.totalUsers === 0 ? `$0` : `$${Math.round(platformOverview.totalRevenue / platformOverview.totalUsers)}`
            }
            </span>
          </div>
          {/* <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium">Monthly Growth Rate</span>
            <span className="text-2xl font-bold">+8.5%</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  )
}

