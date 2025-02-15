import React from 'react'
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from 'lucide-react'

export default function AnalyticsTab () {
  return (
    <Card className="col-span-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardTitle>Customer Engagement Analytics</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
          <BarChart2 className="h-48 w-48 text-purple-500" />
        </div>
      </CardContent>
    </Card>
    

  )
}


