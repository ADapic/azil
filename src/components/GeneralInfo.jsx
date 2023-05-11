import React from "react";
import "./GeneralInfo.css";

function GeneralInfo() {
  return (
    <div>
      <h1>Šapica</h1>
      <img src="https://i.pinimg.com/736x/18/82/e0/1882e07aecdf7a3286a5013cdad5d0c0.jpg" />
      <p>Adresa: Ruđera Boškovića 6, Split</p>
      <p>Kontakt: 123-456-7890</p>
      <h2>Lokacija</h2>
      <iframe
        title="Map"
        width="600"
        height="450"
        frameborder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed/v1/view?key=AIzaSyB-2vdT0vlbmeEqt1q2I6ya7L3a__YawKQ&center=43.5081,16.4402&zoom=15"
        allowfullscreen
      ></iframe>
      <form>
        <h2>Kontakt</h2>
        <label htmlFor="name">Ime:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Poruka:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Pošalji</button>
      </form>
    </div>
  );
}

export default GeneralInfo;
