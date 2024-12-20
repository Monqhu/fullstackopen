import { useState } from 'react'


const Button = (props) => {

  return(
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const Information = (props) => {
  const {type, selected, points} = props

  console.log(props)


  switch (type) {
    case "votes":
    return(
      <div>
        this anecdote has {points[selected]} votes
      </div>
    )
      
    case "most":
    return(
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{props.text}</p>
      </div>
      
    )
  
    
  }


  if(type === "votes"){
  }


}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array())
  const [mostVoted, setMostVoted] = useState(0)

  let copy = [...points]
  if(points.length < anecdotes.length) attachVotes() //Le damos tamaño al Array.

  const seleccionarFrase = () => {
    let number = Math.floor(Math.random() * anecdotes.length)
    setSelected(number)
    // console.log(number) -> Para ver el número de frase que se selecciona.
  }

  function attachVotes() {
    for(let i = 0; i < anecdotes.length; i++){
      copy[i] = Math.floor(Math.random() * 10) + 1
      setPoints(copy)
    }
  }
  
  function voteUp(selected){
    copy[selected] = copy[selected] + 1
    setPoints(copy)

    //GESTIONAR ESTO: hace falta controlar qué comentario tiene más votos y mostrarlo.

  }

  return(
    <div>
      <h2>ANECDOTES OF THE DAY</h2>
      {anecdotes[selected]}
      <Information type="votes" text1="This anecdote has " text2="votes" selected={selected} points={points} />
      
      <div>
      <Button text="vote" position={selected} onClick={() => voteUp(selected)} />
      <Button text="next anecdote" onClick={seleccionarFrase} />
      </div>
      
      <Information type="most" text={anecdotes[mostVoted]} />


    </div>
  )
}

export default App