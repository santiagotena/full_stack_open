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
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={all}/>
        <StatisticLine text='average' value={average}/>
        <StatisticLine text='positive' value={positive}/>
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
      <Header text = 'give feedback'/>
      <Button handleClick={handleGood} text={'good'}/>
      <Button handleClick={handleNeutral} text={'neutral'}/>
      <Button handleClick={handleBad} text={'bad'}/>
      <Header text = 'statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App