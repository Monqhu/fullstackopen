//COMPONENTS
import { useState, useEffect } from 'react'
import Client from './components/Client'
import Buscador from './components/Buscador'
import Input from './components/Input'
import Notification from './components/Notification'

//BACKEND
import personService from './services/persons'

//OTROS RECURSOS
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [buscador, setBuscador] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState('No hay nada que comentar..')
  const [notificationType, setNotificationType] = useState('success')
  const clientsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(buscador.toLowerCase()) || person.number.includes(buscador))


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const addContact = (event) => {
    event.preventDefault()
    let check = checkIfNameExists(newName) //Comprobamos que el nombre no esté seleccionado con esta función
    
    if(!check){
      const newPerson = {
        name: newName, 
        number: newNumber
      }

      personService
      .create(newPerson)
      .then(response => {
        setNotificationMessage(`${response.data.name} added to the phonebook`)
        setNotificationType('success')
        setTimeout(() => {setNotificationMessage(null)}, 5000);
        setPersons(persons.concat(response.data))
      })
    }
    else{
      //CAMBIAMOS EL NÚMERO, PERO RESPETAMOS EL NOMBRE

      let check = window.confirm("Seguro que quieres cambiar el número de este contacto?")

      if(check == true){
        const changedPerson = {...persons.find(p => p.name == newName), number: newNumber} 
        personService
        .update(changedPerson.id, changedPerson)
        .then(response => {
          setNotificationMessage(`${response.name} old number changed to ${newNumber}`)
          setNotificationType('success')
          setTimeout(() => {setNotificationMessage(null)}, 5000);
          setPersons(persons.map(p => p.id !== changedPerson.id ? p : response))
        })
        .catch(error => {
          setNotificationMessage(`No hay datos de ${newName} en nuestros servidores.`)
          setNotificationType('fail')
          setTimeout(() => {setNotificationMessage(null)}, 10000);
        })
      }else{
        alert('No se ha cambiado el número')
      }
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

  const deletePersonId = ({id}) => {
    let personsModified = persons.filter(p => p.id !== id)
    let check = window.confirm("Seguro que quieres borrar este contacto?")

    if(check == true){
      try{
        personService
        .destroy(id)
        .then(response => {
          console.log("Información del backend antes de gestionarse: ", response)
          setPersons(personsModified)
        })
      }catch(e){
        alert("error, mira el console.log")
        console.log('esto es un "catch" en la función "deletePerson"')
      }
    }else{
      alert("Se ha abortado la operación")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      Buscador: <Buscador type="text" placeholder='Nombre o teléfono' onChange={(event) => handleBuscadorChange(event.target.value)} /> <br /><br />

      <form onSubmit={addContact}>
        <div>
          <h3>Nuevo contacto</h3>
          <label htmlFor="1">Nombre: </label>
          <Input id="1" type="text" placeholder="Introduzca un nombre" value={newName} onChange={handleClientChange} /> <br />
          
          <label htmlFor="2">Teléfono: </label>
          <Input id="2" type="text" placeholder="Introduzca el número de teléfono" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      {clientsToShow.map((person, index) => (
        <Client key={index} person={person} deletePerson={() => deletePersonId(person)} />
      ))} 
      <div>debug: {buscador}</div>
    </div>
  )
}

export default App