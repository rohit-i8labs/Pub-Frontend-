import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { revenueData, platformOverview } from '../mockData'

export default function RevenueTab() {
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
            <span className="text-2xl font-bold">${Math.round(platformOverview.totalRevenue / platformOverview.totalPubs)}</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium">Avg. Revenue per User</span>
            <span className="text-2xl font-bold">${Math.round(platformOverview.totalRevenue / platformOverview.totalUsers)}</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium">Monthly Growth Rate</span>
            <span className="text-2xl font-bold">+8.5%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

