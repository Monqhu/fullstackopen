const Hello = () => {
  const name = 'Peter'
  const age = 10

  return(
    <>
      <div>
        <p>Hello {name}, you are {age} years old</p>
      </div>
    </>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}


const App = () => {
  const friends = [ 'Peter', 'Maya']

  return (
    
    <div>
      <p>{friends}</p>
    </div>
  )
}

export default App