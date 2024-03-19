import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

// Get all persons
export const getPersons = () => {
  return axios.get(baseUrl);
};

// Create new person
export const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

// Delete person
export const deletePerson = (idPerson) => {
  return axios.delete(`${baseUrl}/${idPerson} `);
};

// Update person
export const updatePerson = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id} `, newPerson);
};
