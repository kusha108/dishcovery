import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const backendURL = "http://localhost:5000"; // backend base URL
  const navigate = useNavigate();

  // handle card click → navigate to recipe detail page
  const handleClick = () => navigate(`/recipes/${recipe._id}`);

  // ✅ Fix image path (handles both "uploads/..." and "C:/dishcovery/backend/uploads/...")
  const getImageURL = () => {
    if (!recipe.image) return null;

    // If stored as "C:/dishcovery/backend/uploads/123.png"
    if (recipe.image.includes("backend")) {
      const filename = recipe.image.split("uploads/")[1];
      return `${backendURL}/uploads/${filename}`;
    }

    // If already stored as "uploads/123.png"
    return `${backendURL}/${recipe.image}`;
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 5,
        borderRadius: 3,
        m: 2,
        backgroundColor: "#fafafa",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
        {recipe.image && (
          <CardMedia
            component="img"
            height="200"
            image={getImageURL()} // ✅ dynamic image resolver
            alt={recipe.title}
            sx={{
              objectFit: "cover",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
            onError={(e) => {
              // fallback if image missing
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x200.png?text=Image+Not+Available";
            }}
          />
        )}

        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {recipe.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 50,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {recipe.description}
          </Typography>

          {recipe.author?.name && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                👨‍🍳 By {recipe.author.name}
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

