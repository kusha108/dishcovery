import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          backgroundSize: "400% 400%",
          animation: "neonShift 15s ease infinite",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          px: 3,
          color: "#fff",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* ✨ Floating Food Icons Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          {[...Array(12)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${20 + Math.random() * 40}px`,
                color: `hsla(${Math.random() * 360}, 100%, 70%, 0.15)`,
                animation: `float${i} ${10 + Math.random() * 10}s linear infinite`,
              }}
            >
              {["🍽️", "🍕", "🍜", "🥗", "🍔", "🍰", "☕", "🍣", "🍩", "🍤", "🥘", "🍷"][
                Math.floor(Math.random() * 12)
              ]}
            </Box>
          ))}
        </Box>

        <Container sx={{ zIndex: 2 }}>
          {/* ======= Title ======= */}
          <Typography
            variant="h2"
            fontWeight={800}
            mb={2}
            sx={{
              background:
                "linear-gradient(90deg, #00fff0, #ff00c8, #ff8a00, #7cff00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "1px",
              textShadow: "0 0 25px rgba(255,255,255,0.2)",
            }}
          >
            Welcome to Dishcovery 🍴
          </Typography>

          {/* ======= Subtitle ======= */}
          <Typography
            variant="h6"
            mb={5}
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.5px",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Discover new recipes, share your favorites, and connect with food
            lovers worldwide. Dishcovery is where creativity meets taste.
          </Typography>

          {/* ======= Buttons ======= */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<RestaurantMenuIcon />}
              onClick={() => navigate("/recipes")}
              sx={{
                background: "linear-gradient(45deg, #ff00c8, #ff8a00)",
                color: "#fff",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                boxShadow: "0px 4px 15px rgba(255, 0, 200, 0.4)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 25px rgba(255, 0, 200, 0.6)",
                  transition: "0.3s",
                },
              }}
            >
              Explore Recipes
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate("/add")}
              sx={{
                color: "#00fff0",
                borderColor: "#00fff0",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                "&:hover": {
                  background: "rgba(0, 255, 240, 0.1)",
                  borderColor: "#7cff00",
                  transform: "scale(1.05)",
                  transition: "0.3s",
                },
              }}
            >
              Add New Recipe
            </Button>
          </Stack>

          {/* ======= Footer ======= */}
          <Box
            sx={{
              mt: 8,
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              letterSpacing: 0.5,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Crafted with ❤️ by <strong>Kushagra Gangwar</strong>
          </Box>
        </Container>

        {/* ======= Animations ======= */}
        <style>{`
          @keyframes neonShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          ${[...Array(12)]
            .map(
              (_, i) => `
            @keyframes float${i} {
              0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
              50% { transform: translateY(-30px) rotate(10deg); opacity: 0.6; }
              100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
            }
          `
            )
            .join("\n")}
        `}</style>
      </Box>
    </Fade>
  );
}
