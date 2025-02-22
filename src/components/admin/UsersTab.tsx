import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import api from '@/lib/axios';

export default function UsersTab() {
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
    <Card>
      <CardHeader>
        <CardTitle>User Statistics</CardTitle>
        <CardDescription>Detailed user growth and engagement metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium">New Users (This Month)</span>
            <span className="text-2xl font-bold">+3,678</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium">Active Users (Daily)</span>
            <span className="text-2xl font-bold">12,345</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium">Avg. Session Duration</span>
            <span className="text-2xl font-bold">18 min</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium">User Retention Rate</span>
            <span className="text-2xl font-bold">76%</span>
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}

