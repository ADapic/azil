import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./AnimalList.css";
import RoleContext from "./RoleContext";

function AnimalList({ animals }) {
  const [data, setData] = useState([]);
  const [vrsta, setVrsta] = useState("");
  const [udomljena, setUdomljena] = useState("");

  const { isAdmin } = useContext(RoleContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("azil.json");
      setData(result.data.zivotinje);
    };
    fetchData();
  }, []);

  const handleVrstaChange = (event) => {
    setVrsta(event.target.value);
  };

  const handleUdomljenaChange = (event) => {
    setUdomljena(event.target.value);
  };
  const handleUdomiZivotinju = (id) => {
    const newData = data.map((zivotinja) => {
      if (zivotinja.id === id) {
        return { ...zivotinja, udomljen: true };
      }
      return zivotinja;
    });
    setData(newData);
  };

  const filteredData = data.filter((zivotinja) => {
    if (vrsta && zivotinja.vrsta !== vrsta) {
      return false;
    }
    if (udomljena === "udomljena" && !zivotinja.udomljen) {
      return false;
    }
    if (udomljena === "nije-udomljena" && zivotinja.udomljen) {
      return false;
    }
    return true;
  });

  return (
    <div className="animal-list-container">
      <h1 className="animal-list-title">Popis životinja u azilu</h1>
      <div className="animal-list-filters">
        <div className="animal-list-filter">
          <label htmlFor="vrsta">Vrsta:</label>
          <div className="animal-list-filter-options">
            <div>
              <input
                type="radio"
                id="sve-vrste"
                name="vrsta"
                value=""
                checked={!vrsta}
                onChange={handleVrstaChange}
              />
              <label htmlFor="sve-vrste">Sve vrste</label>
            </div>
            <div>
              <input
                type="radio"
                id="pas"
                name="vrsta"
                value="pas"
                checked={vrsta === "pas"}
                onChange={handleVrstaChange}
              />
              <label htmlFor="pas">Pas</label>
            </div>
            <div>
              <input
                type="radio"
                id="macka"
                name="vrsta"
                value="mačka"
                checked={vrsta === "mačka"}
                onChange={handleVrstaChange}
              />
              <label htmlFor="macka">Mačka</label>
            </div>
          </div>
        </div>
        <div className="animal-list-filter">
          <label htmlFor="udomljena">Status udomljavanja:</label>
          <div className="animal-list-filter-options">
            <div>
              <input
                type="radio"
                id="sve-zivotinje"
                name="udomljena"
                value=""
                checked={!udomljena}
                onChange={handleUdomljenaChange}
              />
              <label htmlFor="sve-zivotinje">Sve životinje</label>
            </div>
            <div>
              <input
                type="radio"
                id="udomljena"
                name="udomljena"
                value="udomljena"
                checked={udomljena === "udomljena"}
                onChange={handleUdomljenaChange}
              />
              <label htmlFor="udomljena">Udomljene</label>
            </div>
            <div>
              <input
                type="radio"
                id="nije-udomljena"
                name="udomljena"
                value="nije-udomljena"
                checked={udomljena === "nije-udomljena"}
                onChange={handleUdomljenaChange}
              />
              <label htmlFor="nije-udomljena">Nisu udomljene</label>
            </div>
          </div>
        </div>
      </div>
      <table className="animal-list-table">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Vrsta</th>
            <th>Čip</th>
            <th>Godine</th>
            <th>Status udomljavanja</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((zivotinja) => (
            <tr
              key={zivotinja.id}
              className={zivotinja.udomljen ? "udomljena" : "nije-udomljena"}
            >
              <td>{zivotinja.ime}</td>
              <td>{zivotinja.vrsta}</td>
              <td>{zivotinja.cip ? "Da" : "Ne"}</td>
              <td>{zivotinja.godine}</td>
              <td>{zivotinja.udomljen ? "Udomljena" : "Nije udomljena"}</td>
              <td>
                {!zivotinja.udomljen && (
                  <button onClick={() => handleUdomiZivotinju(zivotinja.id)}>
                    Udomi
                  </button>
                )}
                {isAdmin && <button onClick={() => edit(index)}>Uredi</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnimalList;
