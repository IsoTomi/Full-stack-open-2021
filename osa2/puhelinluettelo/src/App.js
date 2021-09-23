import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

// App-component
const App = () => {
  // HOOKS
  const [ persons, setPersons ] = useState([]);
  const [ newPerson, setNewPerson ] = useState({})
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ noteMessage, setNoteMessage ] = useState(null)
  const [ error, setError ] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })      
  }, [])

  // EVENT HANDLERS

  // addPerson - Adds a new person to the phonebook
  const addPerson = (event) => {
    event.preventDefault();
      
    const personObject = {
      name: newName,
      number: newNumber
    };

    // Is the person been already listed?
    const found = persons.find(person => person.name === newName);

    // Has the user gave a name and a number?
    // No?
    if (newName === '' || newNumber === '') {
       // Show the notification for 5 seconds
       setNoteMessage('Please give a name and a number.')
       setTimeout(() => {
         setNoteMessage(null)
       }, 5000)
       return 
    }

    if (found !== undefined) {
      // Person is already been listed
      if (window.confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one?`) === true) {
        // Update the number
        personService
        .update(found.id, personObject)
        .then(response => {
          // Map a new array with the changed number
          const newArray = persons.map(person => person.id === found.id ? 
            {...person, number: newNumber} : person)
          setPersons(newArray)  // Update 
          setError(false)       // Set notification as non-error

          // Show the notification for 5 seconds
          setNoteMessage(`Changed the number for ${response.name}`)
          setTimeout(() => {
            setNoteMessage(null)
          }, 5000)

          // Update
          setNewName('')
          setNewNumber('')
        })
        // Person has already been deleted
        .catch(error => {
          // Set notification as an error
          setError(true)
          // Show notification for 5 secoonds
          setNoteMessage(
            `Information of ${newName} has already been removed from the server`
          )
          setTimeout(() => {
            setNoteMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== found.id))
        })
      }
    // Name not found in the phonebook
    } else {
      // Create a new person
      personService
      .create(personObject)
      .then(response => {
        // Update
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        // Set notification as non-error
        setError(false)
        // Show notification for 5 secoonds
        setNoteMessage(`Added ${response.name}`)
        setTimeout(() => {
          setNoteMessage(null)
        }, 5000)
      })
    } 
  }

  // handlePersonChange - Handles the changes in the Name input-field
  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  // handleNumberChange - Handles the changes in the Number input-field
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  // handleFilterChange - Handles the changes in the Filter input-field
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  // handlePersonRemove - Removes a person from the phonebook
  const handlePersonRemove = (id) => {
    // find the name of the person using id
    const name = persons.find(person => person.id === id).name
    
    if (window.confirm(`Delete ${name}`) === true)
    {
      // Delete the person
      personService
      .remove(id)
      .then(response => {
        // Filter a new array without the deleted user
        const newArray = persons.filter(person => person.id !== id)
        // Update
        setPersons(newArray)
        setError(false)       // Set notification as non-error
          // Show notification for 5 secoonds
          setNoteMessage(`Deleted ${name}`)
          setTimeout(() => {
            setNoteMessage(null)
          }, 5000)
      })
    }
  }

  // RENDER
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={noteMessage} error={error} />
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