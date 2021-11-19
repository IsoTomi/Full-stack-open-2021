import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  // Is the messsage an error message?
  const className = error === true ? 'error' : 'notification'

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification