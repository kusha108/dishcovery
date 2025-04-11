import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleMenu = () => {
    setIsOpen(false);
  };

  const LogoutUser = () => {
    if (window.confirm("You wanna logout?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-left">
          <FontAwesomeIcon
            icon={faBars}
            className="hamburger-icon"
            onClick={toggleMenu}
            style={isOpen ? { transform: "rotate(90deg)" } : {}}
          />
          <h2 className="logo">Dishcovery</h2>
        </div>
        <div className={`nav-right ${isOpen ? "open" : ""}`}>
          <ul>
            {auth ? (
              <>
                <li><NavLink to="/recipes" onClick={handleToggleMenu}>Recipes</NavLink></li>
                <li><NavLink to="/addRecipe" onClick={handleToggleMenu}>Add Recipe</NavLink></li>
                <li><NavLink to="/favouriteRecipes" onClick={handleToggleMenu}>Favourites</NavLink></li>
                <li><NavLink to="/login" onClick={LogoutUser}>Logout</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/signup" onClick={handleToggleMenu}>Sign Up</NavLink></li>
                <li><NavLink to="/login" onClick={handleToggleMenu}>Login</NavLink></li>
                <li><NavLink to="/forgotPassword" onClick={handleToggleMenu}>Forgot Password</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
