
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  IconButton,
  Snackbar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [snack, setSnack] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const backendURL = "http://localhost:5000";

  useEffect(() => {
    api.get(`/recipes/${id}`)
      .then(res => setRecipe(res.data.data || res.data));
  }, [id]);

  const likeRecipe = async () => {
    await api.put(`/recipes/like/${id}`);
    setSnack("❤️ Liked");
  };

  const saveRecipe = async () => {
    await api.put(`/recipes/save/${id}`);
    setSnack("📌 Saved");
  };

  const deleteRecipe = async () => {
    await api.delete(`/recipes/${id}`);
    navigate("/recipes");
  };

  if (!recipe)
    return (
      <Typography align="center" mt={5}>
        Loading...
      </Typography>
    );

  const imageURL =
    recipe.image
      ? `${backendURL}/${recipe.image.replace(/\\/g, "/")}`
      : "";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#fff",
        position: "relative",

        /* CLEAR IMAGE */
        backgroundImage: `url(${imageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LIGHT OVERLAY (NOT BLURRY) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.75))",
        }}
      />

      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          py: 10,
        }}
      >
        {/* CONTENT CARD (NO BLUR) */}
        <Box
          sx={{
            background: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(255,255,255,0.15)",
            p: 5,
            borderRadius: 5,
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {/* TITLE */}
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              mb: 1,
              background:
                "linear-gradient(45deg,#ff9800,#ff1744)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🍝 {recipe.title}
          </Typography>

          <Typography color="#ddd" mb={2}>
            👨‍🍳 By {recipe.author?.name}
          </Typography>

          {/* ACTIONS */}
          <Stack direction="row" spacing={2} mb={3}>
            <IconButton onClick={likeRecipe} sx={{ color: "#ff1744" }}>
              <FavoriteIcon />
            </IconButton>

            <IconButton onClick={saveRecipe} sx={{ color: "#ff9800" }}>
              <BookmarkIcon />
            </IconButton>

            {user._id === recipe.author?._id && (
              <Button
                startIcon={<DeleteIcon />}
                onClick={deleteRecipe}
                sx={{
                  ml: "auto",
                  background:
                    "linear-gradient(45deg,#ff9800,#ff1744)",
                  color: "#fff",
                  fontWeight: 700,
                  px: 3,
                  borderRadius: 2,
                }}
              >
                Delete
              </Button>
            )}
          </Stack>

          {/* DESCRIPTION */}
          <Typography
            sx={{
              lineHeight: 1.8,
              color: "#eee",
              mb: 4,
              fontSize: 16,
            }}
          >
            🍕 {recipe.description}
          </Typography>

          {/* INGREDIENTS */}
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 800,
              color: "#ff9800",
            }}
          >
            🧂 Ingredients
          </Typography>

          <Stack direction="row" gap={1.5} flexWrap="wrap" mb={4}>
            {recipe.ingredients.map((i, idx) => (
              <Chip
                key={idx}
                label={`🍴 ${i}`}
                sx={{
                  background:
                    "linear-gradient(45deg,#ff9800,#ff5722)",
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>

          {/* STEPS */}
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 800,
              color: "#ff1744",
            }}
          >
            👨‍🍳 Steps
          </Typography>

          {recipe.steps.map((s, idx) => (
            <Typography
              key={idx}
              sx={{
                color: "#ddd",
                mb: 1.2,
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              {idx + 1}. 🍽️ {s}
            </Typography>
          ))}
        </Box>
      </Container>

      <Snackbar
        open={!!snack}
        autoHideDuration={1500}
        message={snack}
        onClose={() => setSnack("")}
      />
    </Box>
  );
}
