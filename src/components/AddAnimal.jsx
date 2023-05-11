import React, { useState } from "react";
import RoleContext from "./RoleContext";
import { useContext } from "react";
import axios from "axios";
import "./AddAnimal.css";

function AddAnimal(props) {
  const { isAdmin } = useContext(RoleContext);

  const [formaPodaci, postaviPodatke] = useState({
    ime: "",
    vrsta: "",
    cip: false,
    godine: "",
    opis: "",
    pregled: "",
    udomljen: false,
  });

  function obradiPodatke(objekt) {
    return {
      ime: objekt.ime,
      vrsta: objekt.vrsta,
      cip: objekt.cip,
      godine: objekt.godine,
      opis: objekt.opis,
      pregled: objekt.pregled,
      udomljen: objekt.udomljen,
    };
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formaPodaci);

    const zaSlanje = obradiPodatke(formaPodaci);

    axios.post("http://localhost:3001/zivotinje", zaSlanje).then((rez) => {
      props.dodaj((stanje) => [...stanje, rez.data]);
    });
  };
  function promjenaUlaza(event) {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    postaviPodatke({ ...formaPodaci, [name]: newValue });
  }
  return (
    <div className="add-animal">
      {isAdmin ? (
        <form onSubmit={handleSubmit}>
          <label>
            Ime:
            <input
              type="text"
              value={formaPodaci.ime}
              onChange={promjenaUlaza}
              name="ime"
              required
            />
          </label>
          <label>
            Vrsta:
            <select
              value={formaPodaci.vrsta}
              onChange={promjenaUlaza}
              name="vrsta"
            >
              <option value="mačka">Mačka</option>
              <option value="pas">Pas</option>
              <option value="ostalo">Ostalo</option>
            </select>
          </label>
          <label>
            Čip:
            <input
              type="checkbox"
              checked={formaPodaci.cip}
              onChange={promjenaUlaza}
              name="cip"
            />
          </label>
          <label>
            Godine:
            <input
              type="number"
              value={formaPodaci.godine}
              onChange={promjenaUlaza}
              name="godine"
              required
            />
          </label>
          <label>
            Opis:
            <textarea
              value={formaPodaci.opis}
              onChange={promjenaUlaza}
              name="opis"
            />
          </label>
          <label>
            Zadnji pregled:
            <input
              type="date"
              value={formaPodaci.pregled}
              onChange={promjenaUlaza}
              name="pregled"
            />
          </label>
          <label>
            Udomljen:
            <input
              type="checkbox"
              checked={formaPodaci.udomljen}
              onChange={promjenaUlaza}
              name="udomljen"
            />
          </label>

          <button type="submit">Dodaj životinju</button>
        </form>
      ) : (
        <p>You must be logged in as an administrator to access this page.</p>
      )}
    </div>
  );
}
export default AddAnimal;
