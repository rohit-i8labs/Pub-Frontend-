import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { userGrowthData } from '../mockData'

export function UsersTab() {
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
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </CardContent>
    </Card>
  )
}

