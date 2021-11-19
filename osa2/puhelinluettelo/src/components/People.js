import React from 'react'

const People = ({ people, filter, removeHandler }) => {
  // Fiter the persons using regular expressions
  const regex = new RegExp(filter, 'i')
  const filteredPeople = people.filter(person => person.name.match(regex))

  return (
    <div>
      <ul>
        {filteredPeople.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => removeHandler(person.id)}>Delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default People