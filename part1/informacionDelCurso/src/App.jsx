import { useState } from 'react'


const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Display = (props) => {
  return(
    <div>
      {props.text}: {props.total}
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(good + neutral + bad)
  const [average, setAverage] = useState('Waiting for data')
  const [positive, setPositive] = useState('Doing some high-tech math stuff...')


  /*
  const operation = (type) => {

    
    console.log(type)

    if (type === undefined) return null;

    if (type === "sum") {
      
      setGood((prev) => prev + 1);

    }
    if (type === "rest") {
      setBad((prev) => prev - 1);
    }
    if (type === "mult") {
      setNumero((prev) => prev * 2);
    }


  };
  */


  const operate = (operate) => {
    let goodUpdated = good
    let badUpdated = bad
    let neutralUpdated = neutral
    let allUpdated = all

    
    switch (operate) {
      case 'good':

        setGood((prev) => prev + 1)
        goodUpdated = goodUpdated + 1
        allUpdated = allUpdated + 1
        setAll(goodUpdated + neutral +bad)
        calculateAverage(goodUpdated, neutralUpdated, badUpdated, allUpdated)
        calculatePositive(allUpdated, goodUpdated)
      break;
    
      case 'neutral': 
        setNeutral((prev) => prev +1)
        neutralUpdated = neutralUpdated + 1
        allUpdated = allUpdated + 1
        setAll(good + neutralUpdated + bad)   
        calculateAverage(goodUpdated, neutralUpdated, badUpdated, allUpdated)
        calculatePositive(allUpdated, goodUpdated)
      break;

      case 'bad':
        setBad((prev) => prev + 1)
        badUpdated = badUpdated + 1
        allUpdated = allUpdated + 1
        setAll(good + neutral + badUpdated)
        calculateAverage(goodUpdated, neutralUpdated, badUpdated, allUpdated)
        calculatePositive(allUpdated, goodUpdated)
      break;
    }
  }

  const calculateAverage = (goodUpdated, neutralUpdated, badUpdated, allUpdated) => {
    let averageCalculated = (goodUpdated - badUpdated) / allUpdated
    setAverage(averageCalculated)
  }

  const calculatePositive = (allUpdated, goodUpdated) => {
    let positiveUpdated = goodUpdated * 100 / allUpdated
    setPositive(positiveUpdated)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => operate('good')} text="good" />
      <Button onClick={() => operate('neutral')} text="neutral" />
      <Button onClick={() => operate('bad')} text="bad" />

      <Button onClick={() => operation('sum')} text="Frank:Sum" />


    
      <h1>Statistics</h1>
      <Display text="good" total={good} />
      <Display text="neutral" total={neutral} />
      <Display text="bad" total={bad} />
      <Display text="all" total={all} />
      <Display text="average" total={average} />
      <Display text="Positive comments (in %)" total={positive} />
    
    
    </div>
  )
}

export default App