import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import List from "./components/List"
import Person from "./components/Person"
import personService from "./services/persons"
import InfoMessage from "./components/InfoMessage"
import ErrorMessage from "./components/ErrorMessage"
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState("")
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const foundName = persons.find(person => person.name === newName)
    const foundNumber = persons.find(person => person.number === newNumber)
    if (foundName !== undefined) {
      if (
        window.confirm(`"${newName}" is already added to phonebook, 
          replace the old number with a new one?`)
      ) {
        const rightPerson = persons.find(
          person => person.name === foundName.name
        )
        const idOfPerson = rightPerson.id
        const changedPerson = { ...rightPerson, number: personObject.number }
        personService.update(idOfPerson, changedPerson).then(response => {
          setPersons(
            persons.map(person =>
              person.id !== idOfPerson ? person : changedPerson
            )
          )
          setNewName("")
          setNewNumber("")
          setShowAll(showAll)
          setInfoMessage(`Updated number of "${personObject.name}"`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
        })
      }
    } else if (foundNumber !== undefined) {
      if (
        window.confirm(`"${newNumber}" is already number of "${foundNumber.name}", 
          replace the old name with a new one?`)
      ) {
        const rightPerson = persons.find(
          person => person.number === foundNumber.number
        )
        const idOfPerson = rightPerson.id
        const changedPerson = { ...rightPerson, name: personObject.name }
        personService.update(idOfPerson, changedPerson).then(response => {
          setPersons(
            persons.map(person =>
              person.id !== idOfPerson ? person : changedPerson
            )
          )
          setNewName("")
          setNewNumber("")
          setShowAll(showAll)
          setInfoMessage(
            `Updated "${rightPerson.name}" to "${personObject.name}"`
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
        })
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setShowAll(showAll)
        setInfoMessage(`Added "${returnedPerson.name}"`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

  const handlePersonChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFiltering = event => {
    setShowAll(event.target.value)
  }

  const removePerson = id => {
    const rightPerson = persons.find(person => person.id === id)
    const rightName = rightPerson.name
    if (window.confirm(`Delete ${rightName}?`))
      personService
        .remove(id)
        .then(response => {
          personService.getAll().then(initialPersons => {
            setPersons(initialPersons)
            setInfoMessage(`Deleted ${rightName}`)
            setTimeout(() => {
              setInfoMessage(null)
            }, 3000)
          })
        })
        .catch(error => {
          setErrorMessage(`Information of "${rightName}" 
                has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          personService.getAll().then(initialPersons => {
            setPersons(initialPersons)
          })
        })
  }

  const personsToShow = persons.filter(person => person.name.includes(showAll))

  const rows = () =>
    personsToShow.map(person => (
      <List
        key={person.id}
        person={person}
        removePerson={() => removePerson(person.id)}
      />
    ))

  return (
    <div>
      <h1>Phonebook</h1>
      <InfoMessage message={infoMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter onChange={handleFiltering} />
      <h3> add a new</h3>
      <Person
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {rows()}
    </div>
  )
}

export default App
