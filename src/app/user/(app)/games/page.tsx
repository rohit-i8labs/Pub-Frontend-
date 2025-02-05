"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import TriviaGame from '@/components/user/TriviaGame'
import RockPaperScissors from '@/components/user/RockPaperScissors'

export default function GamesSection() {
  const [currentGame, setCurrentGame] = useState(null)

  return (
    <div className="flex-1 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg shadow-lg overflow-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-cyan-800">Pub Games</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button onClick={() => setCurrentGame('trivia')} variant="outline" className="h-24 bg-white text-cyan-700 border-cyan-300 hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-300">
          Pub Trivia
        </Button>
        <Button onClick={() => setCurrentGame('rps')} variant="outline" className="h-24 bg-white text-blue-700 border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300">
          Rock Paper Scissors
        </Button>
      </div>
      {currentGame === 'trivia' && <TriviaGame />}
      {currentGame === 'rps' && <RockPaperScissors />}
    </div>
  )
}

