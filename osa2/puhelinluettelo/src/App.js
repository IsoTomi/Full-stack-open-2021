import React, { useState } from 'react'

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
const Persons = ({persons, filter}) => {
  const regex = new RegExp(filter, 'i');
  const filteredPersons = persons.filter(person => person.name.match(regex));

  return (
    <div>
      <ul>
        {filteredPersons.map(person =>
          <li>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  );
}
  
// App-component
const App = () => {
  // Hooks
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  // Event handlers
  const addPerson = (event) => {
    event.preventDefault();
      
    // Is the person already listed
    const found = persons.find(person => person.name === newName);
    if (found !== undefined)
    return alert(`${newName} is already added to phonebook`);
    
    const personObject = {
      name: newName,
      number: newNumber
    };
    
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handlFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterHandler={handlFilterChange} />
      <h2>Add new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        add={addPerson}
        personChanger={handlePersonChange}
        numberChanger={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
      
    </div>
  )    
}
  
export default App