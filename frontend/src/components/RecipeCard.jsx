import React, { useState } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function RecipeCard({ recipe }) {

  // ✅ USE DEPLOYED BACKEND URL
  const backendURL = "https://flavorly-backend.onrender.com";

  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleClick = () =>
    navigate(`/recipes/${recipe._id}`);

  // ✅ FIXED IMAGE URL BUILDER
  const getImageURL = () => {
    if (!recipe?.image) return null;

    // if already full URL, return as is
    if (recipe.image.startsWith("http"))
      return recipe.image;

    return `${backendURL}${recipe.image}`;
  };

  const like = async (e) => {
    e.stopPropagation();
    setLiked(!liked);
    try {
      await api.put(`/recipes/like/${recipe._id}`);
    } catch {}
  };

  const save = async (e) => {
    e.stopPropagation();
    setSaved(!saved);
    try {
      await api.put(`/recipes/save/${recipe._id}`);
    } catch {}
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 270,
        height: 360,
        borderRadius: 5,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        background: "#000",
        boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
        transition: "0.35s",

        "&:hover": {
          transform: "translateY(-12px) scale(1.03)",
        },

        "&:hover .overlay": {
          opacity: 1,
        },
      }}
    >
      <CardMedia
        component="img"
        image={
          getImageURL() ||
          "https://via.placeholder.com/300x200?text=Food"
        }
        sx={{
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Box sx={{
        position:"absolute",
        top:12,
        left:12,
        px:2,
        py:0.5,
        borderRadius:5,
        fontSize:12,
        fontWeight:700,
        background:
          "linear-gradient(45deg,#ff9800,#ff1744)",
        color:"#fff"
      }}>
        🔥 Trending
      </Box>

      <Box
        className="overlay"
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.2))",
          opacity: 0,
          transition: "0.4s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Box sx={{
          background:"rgba(255,255,255,0.08)",
          backdropFilter:"blur(12px)",
          borderRadius:3,
          p:1.5,
          border:"1px solid rgba(255,255,255,0.15)"
        }}>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 17,
            }}
          >
            🍽️ {recipe.title}
          </Typography>

          <Typography
            sx={{
              color: "#ccc",
              fontSize: 13,
              mb: 1,
            }}
          >
            👨‍🍳 {recipe.author?.name || "Chef"}
          </Typography>

          <Box>
            <IconButton onClick={like}>
              <FavoriteIcon sx={{
                color: liked ? "#ff1744" : "#fff"
              }}/>
            </IconButton>

            <IconButton onClick={save}>
              <BookmarkIcon sx={{
                color: saved ? "#ff9800" : "#fff"
              }}/>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
