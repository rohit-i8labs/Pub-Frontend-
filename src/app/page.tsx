"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function page() {
    const router = useRouter()
    useEffect(() => {
        router.push('/login')
    }, [])
  return (
    <div>page</div>
  )
}

export default page