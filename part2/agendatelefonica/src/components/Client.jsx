const Client = (props) => {
  //Deconstruimos los objetos que nos interesen y el resto los almacenamos en 'rest'
  const {person, ...rest} = props

  return(
    <>
      <b>{person.name} {person.number}</b>
      <button onClick={rest.deletePerson}>Borrar contacto</button><br /><br />
    </>
  )
}
//<b>{name}, {number}</b>

export default Client