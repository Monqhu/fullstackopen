
const Hello = (props) => {
 const  {name, age, color} = props
  console.log(props)
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old {color}
      </p>
      <p style={{backgroundColor: color}}>
        AMPARO
      </p>
    </div>
  )
}



function App ()  {
  const pepe = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={pepe} age={age} />
      <Hello color='red' />
    </div>
  )
}
export default App