import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function TriviaGame() {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [playerAnswers, setPlayerAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [currentTurn, setCurrentTurn] = useState(0)
  const players = ['You', 'Alice', 'Bob', 'Charlie']

  const generateQuestion = () => {
    const questions = [
      {
        q: "What's the main ingredient in a Mojito?",
        o: ["Vodka", "Rum", "Gin", "Tequila"],
        a: "Rum"
      },
      {
        q: "Which beer is known as 'The King of Beers'?",
        o: ["Heineken", "Budweiser", "Corona", "Guinness"],
        a: "Budweiser"
      },
      {
        q: "What's the name of the classic cocktail made with gin and vermouth?",
        o: ["Martini", "Margarita", "Manhattan", "Mojito"],
        a: "Martini"
      }
    ]
    const randomQ = questions[Math.floor(Math.random() * questions.length)]
    setQuestion(randomQ.q)
    setOptions(randomQ.o)
    setCorrectAnswer(randomQ.a)
    setPlayerAnswers({})
    setShowResult(false)
    setCurrentTurn(0)
  }

  useEffect(() => {
    generateQuestion()
  }, [])

  const handleAnswer = (answer) => {
    setPlayerAnswers({...playerAnswers, [players[currentTurn]]: answer})
    if (currentTurn < players.length - 1) {
      setCurrentTurn(currentTurn + 1)
    } else {
      setShowResult(true)
    }
  }

  return (
    <div className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-purple-800">Pub Trivia</h3>
      <p className="mb-4 text-lg text-indigo-700">{question}</p>
      {!showResult && (
        <div>
          <p className="mb-2 text-purple-600">Current player: {players[currentTurn]}</p>
          <div className="grid grid-cols-1 gap-2">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                variant="outline"
                className="justify-start bg-white hover:bg-indigo-100 text-indigo-700 border-indigo-300 hover:border-indigo-400 transition-all duration-300"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      )}
      {showResult && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold mb-2 text-purple-800">Results:</h4>
          {Object.entries(playerAnswers).map(([player, answer]) => (
            <p key={player} className={answer === correctAnswer ? "text-green-600" : "text-red-600"}>
              {player}: {answer} {answer === correctAnswer ? "✅" : "❌"}
            </p>
          ))}
          <p className="mt-2 font-semibold text-indigo-700">Correct answer: {correctAnswer}</p>
          <Button onClick={generateQuestion} className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300">Next Question</Button>
        </div>
      )}
    </div>
  )
}

