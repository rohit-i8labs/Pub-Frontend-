import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import api from '@/lib/axios'

export default function PubsTab() {
  const [topPubs, setTopPubs] = useState<{
    name: string;
    users: number;
    revenue: number;
    activeChats: number
  }[]>([])

  const getData = async () => {
    const response = await api.get('/superuser/pubsdata/')
    const data = response.data
    setTopPubs(data.map((pub: any) => ({
      name: pub.name,
      users: pub.total_customers,
      revenue: pub.revenue,
      activeChats: pub.active_chats
    })))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Pubs</CardTitle>
        <CardDescription>Overview of the most active pubs on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pub Name</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Active Chats</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              topPubs.length===0 ?(
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No data available related to the pubs</TableCell>
                </TableRow>
              )
              :(topPubs.map((pub) => (
              <TableRow key={pub.name}>
                <TableCell className="font-medium">{pub.name}</TableCell>
                <TableCell>{pub.users}</TableCell>
                <TableCell>{pub.revenue=== null ? `$0` : `$${pub.revenue}`}</TableCell>
                <TableCell>{pub.activeChats}</TableCell>
              </TableRow>
            )))
          }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

