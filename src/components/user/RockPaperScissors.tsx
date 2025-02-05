import React, { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function RockPaperScissors() {
  const [playerChoices, setPlayerChoices] = useState({})
  const [result, setResult] = useState('')
  const [currentTurn, setCurrentTurn] = useState(0)
  const choices = ['Rock', 'Paper', 'Scissors']
  const players = ['You', 'Alice', 'Bob', 'Charlie']

  const play = (choice) => {
    const newPlayerChoices = {...playerChoices, [players[currentTurn]]: choice}
    setPlayerChoices(newPlayerChoices)
    
    if (currentTurn < players.length - 1) {
      setCurrentTurn(currentTurn + 1)
    } else {
      determineWinner(newPlayerChoices)
    }
  }

  const determineWinner = (choices) => {
    const uniqueChoices = new Set(Object.values(choices))
    if (uniqueChoices.size === 1) {
      setResult("It's a tie!")
    } else if (uniqueChoices.size === 3) {
      setResult("It's a three-way tie!")
    } else {
      const winner = Object.entries(choices).find(([player, choice]) => {
        const otherChoices = Object.values(choices).filter(c => c !== choice)
        return (choice === 'Rock' && otherChoices.includes('Scissors')) ||
               (choice === 'Paper' && otherChoices.includes('Rock')) ||
               (choice === 'Scissors' && otherChoices.includes('Paper'))
      })
      setResult(winner ? `${winner[0]} wins!` : "It's a tie!")
    }
  }

  const resetGame = () => {
    setPlayerChoices({})
    setResult('')
    setCurrentTurn(0)
  }

  return (
    <div className="p-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-cyan-800">Rock Paper Scissors</h3>
      {!result && (
        <div>
          <p className="mb-2 text-blue-600">Current player: {players[currentTurn]}</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {choices.map((choice) => (
              <Button key={choice} onClick={() => play(choice)} variant="outline" className="bg-white hover:bg-blue-100 text-blue-700 border-blue-300 hover:border-blue-400 transition-all duration-300">
                {choice}
              </Button>
            ))}
          </div>
        </div>
      )}
      {result && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold mb-2 text-cyan-800">Results:</h4>
          {Object.entries(playerChoices).map(([player, choice]) => (
            <p key={player} className="text-blue-700">{player} chose: {choice}</p>
          ))}
          <p className="font-bold mt-2 text-2xl text-cyan-600">{result}</p>
          <Button onClick={resetGame} className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">Play Again</Button>
        </div>
      )}
    </div>
  )
}

