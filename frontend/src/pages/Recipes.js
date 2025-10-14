import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Box, Fade } from "@mui/material";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get("/recipes").then((res) => setRecipes(res.data));
  }, []);

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(120deg, #0f0f1a, #1a1b2e, #0c0c1a, #1e1f33)",
          backgroundSize: "400% 400%",
          animation: "darkShift 12s ease infinite",
          py: 6,
          px: { xs: 2, sm: 4 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 💫 Soft Glowing Background Accents */}
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: "10%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(229,46,113,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
            filter: "blur(120px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "350px",
            height: "350px",
            background:
              "radial-gradient(circle, rgba(0,122,255,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
            filter: "blur(100px)",
          }}
        />

        {/* 🌙 CONTENT */}
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h3"
            fontWeight={700}
            mb={5}
            textAlign="center"
            sx={{
              background:
                "linear-gradient(90deg, #ff8a00, #e52e71, #9b00ff, #007aff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "1px",
            }}
          >
            All Recipes 🍽️
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {recipes.length > 0 ? (
              recipes.map((r) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={r._id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 15px 30px rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      backdropFilter: "blur(12px)",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <RecipeCard recipe={r} />
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography
                variant="h6"
                color="rgba(255,255,255,0.7)"
                align="center"
                sx={{ mt: 5 }}
              >
                No recipes found. Be the first to share one! 🍲
              </Typography>
            )}
          </Grid>
        </Container>

        {/* 🔥 Animation */}
        <style>{`
          @keyframes darkShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </Box>
    </Fade>
  );
}
