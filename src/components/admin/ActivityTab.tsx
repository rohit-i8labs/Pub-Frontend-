import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { recentActivities } from '../mockData'

export default function ActivityTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Platform Activity</CardTitle>
        <CardDescription>Latest actions and events across all pubs</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Pub</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.timestamp}</TableCell>
                <TableCell>{activity.pub}</TableCell>
                <TableCell>{activity.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

