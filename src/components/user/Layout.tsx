"use client"
import React from 'react'
import Navigation from './Navigation'
import Header from './Header'


function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col h-screen bg-gradient-to-br from-violet-500 to-fuchsia-500'>
      <Header />
      <main className="flex-1 p-4">
        {children}
      </main>
      <Navigation />
    </div>
  )
}

export default Layout


