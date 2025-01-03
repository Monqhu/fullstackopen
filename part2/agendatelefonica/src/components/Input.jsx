const Input = (props) => {
  const { ...rest} = props
 
 
  return(
    <>
      <input {...rest} />
    </>
  )
}

export default Input