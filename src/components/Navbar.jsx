import React, { useContext } from "react";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { isAdmin, setIsAdmin } = useContext(UserContext);

  const handleCheckbox = (event) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <nav>
      <ul>
        <li>
          <label htmlFor="admin-checkbox">Admin</label>
          <input
            id="admin-checkbox"
            type="checkbox"
            checked={isAdmin}
            onChange={handleCheckbox}
          />
        </li>
        <li>
          <a href="/">Home</a>
        </li>
        {/* ostale stavke izbornika */}
      </ul>
    </nav>
  );
};

export default Navbar;
