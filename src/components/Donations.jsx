import { useState } from "react";

function Donations() {
  // State za spremanje popisa donacija u svakoj kategoriji
  const [lookingForDonations, setLookingForDonations] = useState([]);
  const [offeredDonations, setOfferedDonations] = useState([]);
  const [donatedDonations, setDonatedDonations] = useState([]);

  // State za spremanje nove donacije pri dodavanju u popis "nudi se"
  const [newDonation, setNewDonation] = useState({
    type: "",
    amount: "",
    description: "",
  });

  // Funkcija za spremanje nove donacije
  const handleNewDonation = (event) => {
    const { name, value } = event.target;
    setNewDonation((prevDonation) => ({
      ...prevDonation,
      [name]: value,
    }));
  };

  // Funkcija za dodavanje nove donacije u popis "nudi se"
  const handleAddDonation = (event) => {
    event.preventDefault();
    setOfferedDonations((prevDonations) => [...prevDonations, newDonation]);
    setNewDonation({ type: "", amount: "", description: "" });
  };

  return (
    <div>
      <h1>Donacije</h1>
      {/* Forma za dodavanje nove donacije u popis "nudi se" */}
      <form onSubmit={handleAddDonation}>
        <h2>Nova donacija</h2>
        <label>
          Tip donacije:
          <input
            type="text"
            name="type"
            value={newDonation.type}
            onChange={handleNewDonation}
            required
          />
        </label>
        <br />
        <label>
          Količina:
          <input
            type="number"
            name="amount"
            value={newDonation.amount}
            onChange={handleNewDonation}
            required
          />
        </label>
        <br />
        <label>
          Opis:
          <input
            type="text"
            name="description"
            value={newDonation.description}
            onChange={handleNewDonation}
          />
        </label>
        <br />
        <button type="submit">Dodaj donaciju</button>
      </form>

      {/* Prikaz popisa donacija u svakoj kategoriji */}
      <div>
        <h2>Tražimo</h2>
        <ul>
          {lookingForDonations.map((donation, index) => (
            <li key={index}>
              {donation.type} - {donation.amount} - {donation.description}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Nudi se</h2>
        <ul>
          {offeredDonations.map((donation, index) => (
            <li key={index}>
              {donation.type} - {donation.amount} - {donation.description}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Donirano</h2>
        <ul>
          {donatedDonations.map((donation) => (
            <li key={donation.id}>
              <strong>{donation.type}</strong> - {donation.amount}kn{" "}
              {donation.description && `- ${donation.description}`}
            </li>
          ))}
        </ul>
        <h2>Tražimo</h2>
        <ul>
          {lookingForDonations.map((donation) => (
            <li key={donation.id}>
              <strong>{donation.type}</strong> - {donation.amount}kn{" "}
              {donation.description && `- ${donation.description}`}
              <button onClick={() => donateDonation(donation)}>Doniraj</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Donations;
