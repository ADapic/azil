import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useContext } from "react";

import GeneralInfo from "./components/GeneralInfo";
import AnimalList from "./components/AnimalList";
import AddAnimal from "./components/AddAnimal";
import Donations from "./components/Donations";
import Notifications from "./components/Notifications";
import RoleContext from "./components//RoleContext";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <RoleContext.Provider value={{ isAdmin }}>
      <div className="App-header">
        <header className="admin">
          <input
            type="checkbox"
            checked={isAdmin}
            id="cbx-3"
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label for="cbx-3" class="toggle">
            <span></span>
            Admin
          </label>
        </header>

        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Opći podaci</Link>
                </li>
                <li>
                  <Link to="/animal-list">Popis životinja</Link>
                </li>
                <li>
                  <Link to="/add-animal">Unos novih životinja</Link>
                </li>
                <li>
                  <Link to="/donations">Donacije</Link>
                </li>
                <li>
                  <Link to="/notifications">Obavijesti</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<GeneralInfo />} />
              <Route path="/animal-list" element={<AnimalList />} />
              <Route path="/add-animal" element={<AddAnimal />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </div>
        </Router>
      </div>
    </RoleContext.Provider>
  );
}

export default App;
