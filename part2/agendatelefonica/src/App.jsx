import { useState } from 'react'
import Client from './components/Client'
import Buscador from './components/Buscador'
import Input from './components/Input'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '677996152'
     },
     {name: 'Ada Lovelace', 
      number: '39-44-5323523'
    },
    {name: 'Dan Abramov',
       number: '12-43-234345'
    },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [buscador, setBuscador] = useState('')
  const [showAll, setShowAll] = useState(true)
  const clientsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(buscador.toLowerCase()) || person.number.includes(buscador))

  const addContact = (event) => {
    event.preventDefault()
    let check = checkIfNameExists(newName)
    
    if(!check){
      let personsModified = persons.concat({name: newName, number: newNumber})
      console.log(personsModified)
      setPersons(personsModified)
      console.log("has pulsado el botón de enviar")   
    }else{
      alert(`${newName} ya está en la lista de contactos`)
    }
  }

  const handleClientChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const checkIfNameExists = (name) => {
    let check = persons.some(person => person.name === newName)
    return check
  }

  const handleBuscadorChange = (name) => {
    setBuscador(name)
    if(name === '')setShowAll(true)
    else setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Buscador: <Buscador type="text" placeholder='Nombre o teléfono' onChange={(event) => handleBuscadorChange(event.target.value)} /> <br /><br />

      <form onSubmit={addContact}>
        <div>
          <label htmlFor="1">Nombre: </label><Input id="1" type="text" placeholder="Introduzca un nombre" value={newName} onChange={handleClientChange} /> <br />
          <label htmlFor="2">Teléfono: </label><Input id="2" type="text" placeholder="Introduzca el número de teléfono" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      {clientsToShow.map((person, index) => (
          <Client key={index} person={person} />
      ))} 
      <div>debug: {buscador}</div>
    </div>
  )
}

export default App