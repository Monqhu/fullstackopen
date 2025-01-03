const Client = (props) => {
  const { name, number } = props.person
  return(
    <p><b>{name}, {number}</b></p>
  )
}

export default Client