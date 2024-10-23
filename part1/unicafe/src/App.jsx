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
    <>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive} %</div>
    </>
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