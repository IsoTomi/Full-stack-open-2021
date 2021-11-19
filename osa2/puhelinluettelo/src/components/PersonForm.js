import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.add} >
      <div>
        Name: <input value={props.newName} onChange={props.personChanger} />
      </div>
      <div>
        Number: <input value={props.newNumber} onChange={props.numberChanger} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm