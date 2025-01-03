const Buscador = (props) => {
  const {type, placeholder, onChange} = props
  return(
    <>
      <input type={type} placeholder={placeholder} onChange={onChange} />
    </>
  )
}

export default Buscador