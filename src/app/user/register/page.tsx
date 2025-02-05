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
import { registerSchema } from '@/schemas/registerSchema'
import { useAuth } from '@/context/(user)/CustomerAuthProvider'



export default function Register() {
  const {register}=useAuth()
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      token_valid_hours: 1
    },
  })
  const handleRegister = async () =>  {
    register(form.getValues());
    // form.reset();
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="token_valid_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Valid Hours</FormLabel>
                    <FormControl>
                      <Input  disabled placeholder="Enter token valid hours" {...field} />
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




