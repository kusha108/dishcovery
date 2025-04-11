// File: src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddRecipe from "./components/AddRecipe";
import Login from "./components/Login";
import Register from "./components/Register";
import Recipes from "./components/Recipes";
import ForgotPassword from "./components/ForgotPassword";
import LikedProducts from "./components/likedProducts";
import PrivateComponent from "./components/PrivateComponent";
import "react-toastify/dist/ReactToastify.css";
//import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/addRecipe" element={<AddRecipe />} />
            <Route path="/favouriteRecipes" element={<LikedProducts />} />
          </Route>
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
