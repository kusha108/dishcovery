import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

/* ===== PAGES ===== */
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AIStudio from "./pages/AIStudio";
import Profile from "./pages/Profile";

/* ===== 404 PAGE ===== */
function NotFound() {
  return (
    <div style={{
      minHeight:"100vh",
      background:"#0f0f14",
      color:"white",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      fontSize:"24px",
      fontWeight:"600"
    }}>
      404 | Page Not Found
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR ALWAYS VISIBLE */}
      <Navbar />

      <Routes>

        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===== AI ===== */}
        <Route path="/ai" element={<AIStudio />} />

        {/* ===== PROTECTED ===== */}
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ===== 404 ===== */}
        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}
