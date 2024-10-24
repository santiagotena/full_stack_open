import { useState } from 'react'

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === 'positive') {
    return(
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }

  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = 100 * (good / all)

  if (all === 0) {
    return(
      <p>No feedback given</p>
    )
  }

  return(
    <table>
      <tbody>
        <StatisticLine text='good' value={good} ></StatisticLine>
        <StatisticLine text='neutral' value={neutral} ></StatisticLine>
        <StatisticLine text='bad' value={bad} ></StatisticLine>
        <StatisticLine text='all' value={all} ></StatisticLine>
        <StatisticLine text='average' value={average} ></StatisticLine>
        <StatisticLine text='positive' value={positive} ></StatisticLine>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => {
    const goodScore = good + 1
    setGood(goodScore)
  }
  
  const handleNeutral = () => {
    const neutralScore = neutral + 1
    setNeutral(neutralScore)
  }
  
  const handleBad = () => {
    const badScore = bad + 1
    setBad(badScore)
  }
  
  return (
    <div>
      <Header text = 'give feedback'></Header>
      <Button handleClick={handleGood} text={'good'}></Button>
      <Button handleClick={handleNeutral} text={'neutral'}></Button>
      <Button handleClick={handleBad} text={'bad'}></Button>
      <Header text = 'statistics'></Header>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App