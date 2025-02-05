"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MessageSquare, QrCode, Users } from "lucide-react"
import Analytics from "../analytics/page"
import ChatGroup from "../chatgroup/page"
import {useEffect, useState } from "react"
import {restDetails} from "@/_ApiCall/restaurant"

export default function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [averageStayTime, setAverageStayTime] = useState(0)
  const [totalGroupMessages, setTotalGroupMessages] = useState(0)
  const [totalQrCodeScans, setTotalQrCodeScans] = useState(0)

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      const response = await restDetails()
      setTotalCustomers(response.total_customers)
      setAverageStayTime(response.avg_stay_time)
      setTotalGroupMessages(response.total_messages)
      setTotalQrCodeScans(response.total_qr_scanned)
    }
    fetchTotalCustomers()
  }, [])

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-purple-200">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Stay Time</CardTitle>
            <Clock className="h-4 w-4 text-pink-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${averageStayTime} min`} </div>
            <p className="text-xs text-pink-200">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Group Activity</CardTitle>
            <MessageSquare className="h-4 w-4 text-cyan-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGroupMessages}</div>
            <p className="text-xs text-cyan-200">+12% since yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Code Scans</CardTitle>
            <QrCode className="h-4 w-4 text-emerald-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQrCodeScans}</div>
            <p className="text-xs text-emerald-200">+201 from last week</p>
          </CardContent>
        </Card>
      </div>
      <Analytics />
      <ChatGroup />
    </>
  )
}

