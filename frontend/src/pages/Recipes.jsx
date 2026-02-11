import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get("/recipes").then(res =>
      setRecipes(res.data.data || res.data)
    );
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "#fff",

        /* PREMIUM MULTI-GRADIENT */
        background: `
          linear-gradient(135deg,#1a1a2e,#16213e,#0f3460,#000)
        `,
      }}
    >

      {/* ===== COLOR GLOWS ===== */}
      <Box sx={{
        position:"absolute",
        top:"10%",
        left:"5%",
        width:300,
        height:300,
        background:"radial-gradient(#ff980055,transparent 70%)",
        filter:"blur(90px)"
      }}/>
      <Box sx={{
        position:"absolute",
        bottom:"10%",
        right:"5%",
        width:300,
        height:300,
        background:"radial-gradient(#ff174455,transparent 70%)",
        filter:"blur(90px)"
      }}/>

      {/* ===== FLOATING EMOJIS ===== */}
      <Box sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}>
        {["🍕","🍔","🍜","🍣","🍩","🥗","🌮","🍰"].map((emoji,i)=>(
          <Typography
            key={i}
            sx={{
              position:"absolute",
              fontSize: 42,
              opacity:0.07,
              animation:`float${i} ${18+i*2}s linear infinite`,
              left:`${5+i*12}%`,
            }}
          >
            {emoji}
          </Typography>
        ))}
      </Box>

      {/* ===== CONTENT ===== */}
      <Container sx={{ py:8, position:"relative", zIndex:2 }}>

        <Typography
          variant="h3"
          fontWeight={900}
          mb={2}
          sx={{
            textAlign:"center",
            background:
              "linear-gradient(45deg,#ff9800,#ff1744)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
          }}
        >
          🍽️ Explore Recipes
        </Typography>

        <Typography
          textAlign="center"
          color="#ccc"
          mb={6}
        >
          Discover delicious ideas curated for food lovers 🍴
        </Typography>

        <Grid container spacing={5}>
          {recipes.map(r=>(
            <Grid item xs={12} sm={6} md={4} lg={3} key={r._id}>
              <Box sx={{
                transition:"0.35s",
                "&:hover":{
                  transform:"translateY(-10px) scale(1.02)"
                }
              }}>
                <RecipeCard recipe={r}/>
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>

      {/* ===== FLOAT ANIMATION ===== */}
      <style>{`
        ${[...Array(8)].map((_,i)=>`
          @keyframes float${i}{
            0%{transform:translateY(100vh) rotate(0deg)}
            100%{transform:translateY(-10vh) rotate(360deg)}
          }
        `).join("")}
      `}</style>

    </Box>
  );
}
