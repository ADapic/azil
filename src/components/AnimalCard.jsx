import React, { useContext } from "react";
import { AnimalsContext } from "./AnimalsContext";

function AnimalCard({ animal }) {
  const { updateAnimal } = useContext(AnimalsContext);

  function handleAdopt() {
    updateAnimal(animal.id, { ...animal, adopted: true });
  }

  return (
    <div className="animal-card">
      <img src={animal.image} alt={animal.name} />
      <h2>{animal.name}</h2>
      <p>{animal.description}</p>
      <button onClick={handleAdopt}>Adopt</button>
    </div>
  );
}

export default AnimalCard;
