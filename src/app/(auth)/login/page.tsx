"use client"
import React, { useState } from 'react'
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
import Link from 'next/link'
import api from '@/lib/axios'
import { useAuth } from '@/context/UserAuthContext'
import axios from 'axios'


export default function Login() {
  const {
    setUsername,
    setEmail,
    setId
  } = useAuth()
  const toast = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const handleLogin = async (data: z.infer<typeof userLoginSchema>) => {
    setLoading(true)
    try {
      const response = await api.post("/api/token/", data)
      setId(response.data.user.id)
      setUsername(response.data.user.username)
      setEmail(response.data.user.email)
      
      await axios.post('/api/setCookie', {
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
        isSuperuser: response.data.user.is_superuser
      })

      if (response.data.user.is_superuser) {
        router.push("/admin")
      } else {
        router.push("/restaurant")
      }

      toast.toast({
        variant: "default",
        title: "Success",
        description: "You have successfully logged in",
      })

    } catch (error) {
      toast.toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid username or password",
      })
    } finally {
      setLoading(false)
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
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
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




