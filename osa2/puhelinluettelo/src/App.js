import React, { useState, useEffect } from 'react'
import personService from './services/persons'

// Filter-component
const Filter = ({filter, filterHandler}) => {
  return (
    <div>
      Filter with: <input value={filter} onChange={filterHandler} />
    </div> 
  );
}

// PersonForm-component
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
  );
}

// Persons-component
const Persons = ({persons, filter, removeHandler}) => {
  const regex = new RegExp(filter, 'i');
  const filteredPersons = persons.filter(person => person.name.match(regex));

  return (
    <div>
      <ul>
        {filteredPersons.map(person =>
          <li key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => removeHandler(person.id)}>Delete</button>
          </li>
        )}
      </ul>
    </div>
  );
}
  
// App-component
const App = () => {
  // HOOKS
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })      
  }, [])

  // EVENT HANDLERS
  const addPerson = (event) => {
    event.preventDefault();
      
    const personObject = {
      name: newName,
      number: newNumber
    };

    // Is the person already listed
    const found = persons.find(person => person.name === newName);

    if (found !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one?`) === true) {
        personService
        .update(found.id, personObject)
        .then(response => {
          const newArray = persons.map(person => person.id === found.id ? 
            {...person, number: newNumber} : person)
          setPersons(newArray)
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    } 
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handlePersonRemove = (id) => {
    const name = persons.find(person => person.id === id).name
    
    if (window.confirm(`Delete ${name}`) === true)
    {
      personService
      .remove(id)
      .then(response => {
        const newArray = persons.filter(person => person.id !== id)
        setPersons(newArray)
      })
    }
  }

  // Render
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterHandler={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        add={addPerson}
        personChanger={handlePersonChange}
        numberChanger={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removeHandler={handlePersonRemove} />
      
    </div>
  )    
}
  
export default App