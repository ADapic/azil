import React, { useState, createContext } from "react";

export const AnimalContext = createContext();

export const AnimalProvider = (props) => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);

  const addAnimal = (newAnimal) => {
    setAnimals([...animals, newAnimal]);
  };

  const filterAnimals = (searchTerm) => {
    const filtered = animals.filter((animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAnimals(filtered);
  };

  return (
    <AnimalContext.Provider
      value={{ animals, filteredAnimals, addAnimal, filterAnimals }}
    >
      {props.children}
    </AnimalContext.Provider>
  );
};
