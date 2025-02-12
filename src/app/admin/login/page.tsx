"use client"
import React, { use, useEffect } from 'react'
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


export default function Login() {
  const router = useRouter()
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== null) {
      router.push("/admin")
    }
  }, [])
  const handleRegister = async (data: z.infer<typeof userLoginSchema>) => {
    try {
      const response = await fetch("https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",                     
        },
        body: JSON.stringify(data),
      })
        const res = await response.json()
        const token =res.access
        localStorage.setItem("token", token)
        router.push("/admin")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-600 to-indigo-800 p-4">
      <div className="w-full max-w-md max-h-lg bg-white rounded-lg shadow-xl overflow-hidden p-6 ">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">Join The Tipsy Tavern</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4" >
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
                Register
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>

  )
}




