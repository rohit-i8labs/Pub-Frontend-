"use client"
import React from 'react'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"



export default function CouponsSection() {
  const [totalTime, setTotalTime] = React.useState(0)
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours}h ${minutes}m ${seconds}s`
  }
  const coupons = [
    { title: "1 Hour Special", discount: "Free snack", timeRequired: 3600 },
    { title: "2 Hour Reward", discount: "10% off your bill", timeRequired: 7200 },
    { title: "3 Hour Warrior", discount: "Free pint", timeRequired: 10800 },
    { title: "4 Hour Legend", discount: "25% off your total bill", timeRequired: 14400 }
  ]

  

  return (
    <div className="flex-1 p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg shadow-lg overflow-auto">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2 text-amber-800">Time at The Tipsy Tavern</h3>
        <Progress 
          value={(totalTime / 3600) * 100} 
          className="w-full h-4 bg-amber-200"
        />
        <p className="text-sm text-amber-700 mt-1">Total time: 
          {/* {formatTime(totalTime)} */}
          </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {coupons.map((coupon, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-md ${totalTime >= coupon.timeRequired ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-2 ${totalTime >= coupon.timeRequired ? 'text-white' : 'text-amber-800'}`}>{coupon.title}</h3>
            <p className={totalTime >= coupon.timeRequired ? 'text-amber-100' : 'text-amber-700'}>{coupon.discount}</p>
            <Button className={`mt-2 w-full ${totalTime >= coupon.timeRequired ? 'bg-white text-orange-500 hover:bg-amber-50' : 'bg-amber-500 text-white hover:bg-amber-600'} transition-all duration-300`} disabled={totalTime < coupon.timeRequired}>
              {totalTime >= coupon.timeRequired ? 'Redeem' : `Unlock in ${formatTime(coupon.timeRequired - totalTime)}`}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

