import { useState, useEffect } from "react";
import {
  create,
  deletePerson,
  getPersons,
  updatePerson,
} from "./services/persons";

const Notification = ({ message, clase }) => {
  if (message === null || clase === null) {
    return null;
  }

  return <div className={clase}>{message}</div>;
};

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter, handleDelete }) => {
  return persons
    .filter(
      (p) =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.number.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <div key={person.id}>
        {person.name} {person.number}
        <button style={{ margin: 10 }} onClick={handleDelete} value={person.id}>
          Delete
        </button>
      </div>
    ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [classMessage, setClassMessage] = useState("");

  useEffect(() => {
    // Get all persons from API
    getPersons().then((response) => setPersons(response.data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    // Check if name already exists
    let personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (personExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Do you want to update the phone number?`
        )
      ) {
        updatePerson(personExists.id, newPerson)
          .then((returnedPerson) => {
            console.log({ returnedPerson });
            setPersons(
              persons.map((p) =>
                p.id.toString() === personExists.id ? returnedPerson.data : p
              )
            );
            console.log({ persons });
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificationMessage(error.message);
            setClassMessage("error");

            setTimeout(() => {
              setNotificationMessage(null);
              setClassMessage("");
            }, 3000);
          });
      }
    } else if (newName === "" || newNumber === "") {
      alert("Name and Number are required fields");
    } else {
      // Create new person
      create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setNotificationMessage([
            `${newName} added to the phonebook`,
            "success",
          ]);
        })
        .catch((error) => {
          console.error("ha ocurrido un error");
          setNotificationMessage(error.message);
          setClassMessage("error");
        });

      setTimeout(() => {
        setNotificationMessage(null);
        setClassMessage("error");
      }, 3000);
    }
  };

  // Delete a person from APi
  const handleDelete = (e) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      const idToDelete = e.target.value;

      deletePerson(idToDelete)
        .then(() => {
          // Filter generates a new array
          setPersons(persons.filter((person) => person.id !== idToDelete));
        })
        .catch((error) => {
          console.error("ha ocurrido un error");
          setNotificationMessage(error.message);
          setClassMessage("error");

          setTimeout(() => {
            setNotificationMessage(null);
            setClassMessage("");
          }, 3000);
        });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <Notification message={notificationMessage} clase={classMessage} />

      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
