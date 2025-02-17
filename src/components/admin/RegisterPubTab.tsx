"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from '@/hooks/use-toast'
import { PubRegisterSchema } from '@/schemas/PubRegisterSchema'
import { getUserList } from '@/_ApiCall/user'
import { UserInterface } from '@/interfaces/User'
import { on } from 'events'
import axios from 'axios'

export default function RegisterPubTab() {
  const toast = useToast()
  const [users, setUsers] = useState<UserInterface[]>([]);
  const form = useForm<z.infer<typeof PubRegisterSchema>>({
    resolver: zodResolver(PubRegisterSchema),
    defaultValues: {
      name: "",
      description: "",
      owner_username: "",
    },
  })
  const userList = async () => {
    const response = await getUserList()
    setUsers(response)
  }
  useEffect(() => {
    userList()
  }, [])

  const onSubmit = async (data: z.infer<typeof PubRegisterSchema>) => {
    try {
      console.log(data);
      const response = await axios.post("https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/restaurants/", data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      toast.toast({
        variant: "default",
        description: "You have successfully registered a new restaurant",
      })
    } catch (error) {
      toast.toast({
        variant: "destructive",
        description: "Something went wrong",
      })
    }
  }
  return (
    <Card className="col-span-4 bg-white shadow-lg rounded-lg overflow-hidden  mt-8">
      <CardHeader className="rounded-lg  bg-violet-500 text-white m-6 ">
        <CardTitle>Restaurant Details</CardTitle>
        <CardDescription className='text-white' >Create a new restaurant</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name for the restaurant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the description for the restaurant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="owner_username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner</FormLabel>
                  <Select  onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an owner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.username}>{user.username}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-violet-500 text-white ">
              Register Restaurant
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>


  )
}



