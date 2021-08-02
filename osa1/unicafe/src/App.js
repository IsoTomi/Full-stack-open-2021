import React, { useState } from 'react'

// Button-component
const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}>{text}</button>

// StatisticLine-component
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
} 

// Statistics-component
const Statistics = ({ good, neutral, bad }) => {
  // Helper-functions
  const getAll = () => good + neutral + bad

  const getAverage = () => {
    let ratings = good + bad * -1
    return ratings / getAll()
  }

  const getPositives = () => good / getAll() * 100 + ' %'

  // Conditional rendering
  if (getAll() === 0) 
    return <div>No feedback given</div>

  return (
    <table>
      <tbody>
        <StatisticLine text='Good' value={good} />
        <StatisticLine text='Neutral' value={neutral} />
        <StatisticLine text='Bad' value={bad} />
        <StatisticLine text='All' value={getAll()} />
        <StatisticLine text='Average' value={getAverage()} />
        <StatisticLine text='Positive' value={getPositives()} />
      </tbody>
    </table>  
  )
}

// App-component
const App = () => {
  // States
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  // Event handlers
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
