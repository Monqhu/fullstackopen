const Notification = ({message, type}) => {

  if (message === null) {
    return null
  }

  if(type === 'success'){
    return (
      <div className="notification success">
        {message}
      </div>
    )
  }
  
  if(type === 'fail'){
    return(
      <div className="notification alert">
        {message}
      </div>
    )
  }

}

export default Notification