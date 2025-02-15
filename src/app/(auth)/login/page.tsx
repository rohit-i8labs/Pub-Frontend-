"use client"
import React from 'react'
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userLoginSchema } from '@/schemas/userLoginSchema'
import { useRouter } from "next/navigation"
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import Link from 'next/link'


export default function Login() {
  const toast = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const handleLogin = async (data: z.infer<typeof userLoginSchema>) => {
    try {
      const getToken = await axios.post("https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/api/token/", data)
      if (getToken) {
        const res = await axios.get(`https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/users/?username=${data.username} `, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken.data.access}`
          }
        })
        toast.toast({
          variant: "default",
          title: "Success",
          description: "You have successfully logged in",
        })
        const token = getToken.data.access
        localStorage.setItem("token", token)
        if (res.data[0].is_superuser) {
          router.push("/admin")
        } else {
          router.push("/restaurant")
        }
      }
    
    } catch (error) {
    toast.toast({
      variant: "destructive",
      title: "Error",
      description: "Invalid username or password",
    })
  }
}

return (
  <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-600 to-indigo-800 p-4">
    <div className="w-full max-w-md max-h-lg bg-white rounded-lg shadow-xl overflow-hidden p-6 ">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">Login to the dashboard</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4" >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300">
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account? <Link href="/register" className="text-indigo-600">Register</Link>
        </p>
      </div>
    </div>
  </div>

)
}




