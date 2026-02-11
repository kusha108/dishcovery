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
import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Fade in timeout={700}>
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          color: "#fff",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
        }}
      >
        {/* ===== HERO IMAGE ===== */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.55)",
          }}
        />

        {/* ===== GRADIENT OVERLAY ===== */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.25))",
          }}
        />

        {/* ===== EMOJI BACKGROUND ===== */}
        <Typography
          sx={{
            position: "absolute",
            top: "8%",
            right: "5%",
            fontSize: "110px",
            opacity: 0.07,
          }}
        >
          🍕🍔🍣
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            fontSize: "110px",
            opacity: 0.07,
          }}
        >
          🍩🥗🍜
        </Typography>

        {/* ===== COLOR GLOWS ===== */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 350,
            height: 350,
            background: "radial-gradient(#ff980055, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            right: "15%",
            width: 300,
            height: 300,
            background: "radial-gradient(#ff174455, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* ===== CONTENT ===== */}
        <Container
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box maxWidth="650px">
            {/* TITLE */}
            <Typography
              variant="h2"
              fontWeight={900}
              sx={{
                mb: 2,
                lineHeight: 1.1,
                fontSize: { xs: 38, md: 60 },
              }}
            >
              🍽️ Discover
              <span
                style={{
                  background:
                    "linear-gradient(45deg,#ff9800,#ff1744)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {" "}Smart Cooking
              </span>
              <br />
              With Dishcovery
            </Typography>

            {/* SUBTITLE */}
            <Typography
              sx={{
                color: "#f1f1f1",
                mb: 5,
                fontSize: 18,
                lineHeight: 1.7,
                backdropFilter: "blur(6px)",
              }}
            >
              🍴 Explore recipes, upload your dishes, and get AI-powered
              recommendations tailored to your taste.  
              A modern platform for modern food lovers.
            </Typography>

            {/* BUTTONS */}
            <Stack direction="row" spacing={3}>
              <Button
                variant="contained"
                size="large"
                startIcon={<RestaurantMenuIcon />}
                onClick={() => navigate("/recipes")}
                sx={{
                  background:
                    "linear-gradient(45deg,#ff9800,#ff1744)",
                  px: 5,
                  py: 1.6,
                  fontWeight: 800,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: 16,
                  boxShadow:
                    "0 10px 30px rgba(255,0,0,0.5)",
                  "&:hover": {
                    transform: "scale(1.08)",
                  },
                }}
              >
                🍜 Explore Recipes
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<SmartToyIcon />}
                onClick={() => navigate("/ai")}
                sx={{
                  borderColor: "#ff9800",
                  color: "#ff9800",
                  px: 5,
                  py: 1.6,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: 16,
                  backdropFilter: "blur(8px)",
                  background: "rgba(255,255,255,0.05)",
                  "&:hover": {
                    borderColor: "#fff",
                    color: "#fff",
                    transform: "scale(1.08)",
                  },
                }}
              >
                🤖 AI Studio
              </Button>
            </Stack>
          </Box>
        </Container>

        {/* ===== BOTTOM FADE ===== */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 180,
            background:
              "linear-gradient(to top,#0f3460 25%,transparent)",
          }}
        />
      </Box>
    </Fade>
  );
}

