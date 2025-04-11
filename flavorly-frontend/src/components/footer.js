import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Dishcovery</h3>
        <p>Discover, Cook, and Share Your Favorite Recipes!</p>
        <div className="footer-links">
          <a href="/recipes">Recipes</a>
          <a href="/addRecipe">Add Recipe</a>
          <a href="/favouriteRecipes">Favourites</a>
          <a href="/contact">Contact</a>
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()} Dishcovery. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
