"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Laugh, Heart, IceCream } from 'lucide-react'

export default function FunContent() {
  const [contentType, setContentType] = useState<'jokes' | 'pickupLines' | 'iceBreakers'>('jokes')
  const [content, setContent] = useState('')

  const getRandomContent = (type: 'jokes' | 'pickupLines' | 'iceBreakers') => {
    const contents = {
      jokes: [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? He was outstanding in his field!",
        "Why don't eggs tell jokes? They'd crack each other up!",
      ],
      pickupLines: [
        "Are you a magician? Because whenever I look at you, everyone else disappears!",
        "Do you have a map? I just keep getting lost in your eyes!",
        "Is your name Google? Because you've got everything I've been searching for!",
      ],
      iceBreakers: [
        "If you could have dinner with any historical figure, who would it be and why?",
        "What's the most interesting place you've ever traveled to?",
        "If you could instantly become an expert in one subject, what would it be?",
      ],
    }
    return contents[type][Math.floor(Math.random() * contents[type].length)]
  }

  useEffect(() => {
    setContent(getRandomContent(contentType))
  }, [contentType])

  return (
    <div className="p-4 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg shadow-lg">
      <div className="flex justify-around mb-4">
        <Button onClick={() => setContentType('jokes')} className={`${contentType === 'jokes' ? 'bg-pink-500 text-white' : 'bg-white text-pink-500'} hover:bg-pink-100 transition-all duration-300`}>
          <Laugh className="mr-2 h-4 w-4" /> Jokes
        </Button>
        <Button onClick={() => setContentType('pickupLines')} className={`${contentType === 'pickupLines' ?  'bg-rose-500 text-white' : 'bg-white text-rose-500'} hover:bg-rose-100 transition-all duration-300`}>
          <Heart className="mr-2 h-4 w-4" /> Pickup Lines
        </Button>
        <Button onClick={() => setContentType('iceBreakers')} className={`${contentType === 'iceBreakers' ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'} hover:bg-purple-100 transition-all duration-300`}>
          <IceCream className="mr-2 h-4 w-4" /> Ice Breakers
        </Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow min-h-[100px] flex items-center justify-center">
        <p className="text-lg text-center font-medium text-gray-800">{content}</p>
      </div>
      <Button onClick={() => setContent(getRandomContent(contentType))} className="mt-4 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-300">
        Get Another {contentType === 'jokes' ? 'Joke' : contentType === 'pickupLines' ? 'Pickup Line' : 'Ice Breaker'}
      </Button>
    </div>
  )
}

