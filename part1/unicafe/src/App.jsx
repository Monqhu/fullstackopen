import { useState } from 'react'


const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {

  if(props.all != 0){
    return(
      <div>
        <table>
          <tbody>
            <tr>
              <StatisticLine text="good" value={props.good} table={true} />
            </tr>
            <tr>
              <StatisticLine text="neutral" value={props.neutral} table={true} />
            </tr>
            <tr>
              <StatisticLine text="bad" value={props.bad} table={true} />
            </tr>
            <tr>
              <StatisticLine text="all" value={props.all} table={true} />
            </tr>
            <tr>
              <StatisticLine text="average" value={props.average} table={true} />
            </tr>
            <tr>
              <StatisticLine text="positive" value={props.positive} table={true} />
            </tr>              
          </tbody>
        </table>
       
      </div>
    )
  }else{
    return(
      <div>
        No feedback given
      </div>
    )
  }
}

const StatisticLine = ({text, value, ...rest}) => {

  if(rest.table == true){
    return(     
      <>
        <td>
          {text}
        </td>
        <td>
          {value}
        </td>
      </>
    )
  }

  return(
    <div>

      {text} {value}
    </div>
  )
}



const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(good + neutral + bad)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

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


      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} total={good} positive={positive} />
    </div>
  )
}

export default App