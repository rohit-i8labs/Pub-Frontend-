import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { topPubs } from '../mockData'

export function PubsTab() {
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
            {topPubs.map((pub) => (
              <TableRow key={pub.id}>
                <TableCell className="font-medium">{pub.name}</TableCell>
                <TableCell>{pub.users}</TableCell>
                <TableCell>${pub.revenue}</TableCell>
                <TableCell>{pub.activeChats}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

