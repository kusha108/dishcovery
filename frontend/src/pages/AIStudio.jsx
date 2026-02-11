import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CircularProgress,
  Stack,
  Chip
} from "@mui/material";
import api from "../api/axios";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function AI() {

  const [ingredients,setIngredients]=useState("");
  const [loading,setLoading]=useState(false);
  const [recipes,setRecipes]=useState([]);

  const generate=async()=>{
    if(!ingredients.trim()) return;

    try{
      setLoading(true);

      const ingredientArray = ingredients
        .split(",")
        .map(i=>i.trim().toLowerCase())
        .filter(Boolean);

      const res = await api.post("/ai/recommend",{
        ingredients: ingredientArray
      });

      setRecipes(res.data);

    }catch(err){
      console.log(err);
      setRecipes([]);
    }
    finally{
      setLoading(false);
    }
  };

  return(
    <Box sx={{
      minHeight:"100vh",
      position:"relative",
      overflow:"hidden",
      color:"#fff",

      background:`
        linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)
      `
    }}>

      {/* FLOATING EMOJI WALL */}
      <Box sx={{
        position:"absolute",
        inset:0,
        opacity:0.06,
        fontSize:60,
        lineHeight:1.6
      }}>
        {"🍕🍔🍣🍜🍩🥗".repeat(30)}
      </Box>

      {/* COLOR GLOWS */}
      <Box sx={{
        position:"absolute",
        top:"10%",
        left:"10%",
        width:300,
        height:300,
        background:"radial-gradient(#ff980055,transparent 70%)",
        filter:"blur(90px)"
      }}/>
      <Box sx={{
        position:"absolute",
        bottom:"10%",
        right:"10%",
        width:300,
        height:300,
        background:"radial-gradient(#ff174455,transparent 70%)",
        filter:"blur(90px)"
      }}/>

      <Container sx={{
        py:8,
        textAlign:"center",
        position:"relative",
        zIndex:2
      }}>

        {/* TITLE */}
        <Typography
          variant="h3"
          fontWeight={900}
          mb={2}
          sx={{
            background:
              "linear-gradient(45deg,#ff9800,#ff1744)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent"
          }}>
          🤖 AI Chef Studio
        </Typography>

        <Typography color="#ddd" mb={5}>
          Tell me your ingredients — AI will cook magic 🍽️
        </Typography>

        {/* INPUT CARD */}
        <Card sx={{
          p:5,
          maxWidth:600,
          mx:"auto",
          background:"rgba(255,255,255,0.08)",
          backdropFilter:"blur(25px)",
          borderRadius:5,
          border:"1px solid rgba(255,255,255,0.15)",
          boxShadow:"0 20px 50px rgba(0,0,0,0.7)"
        }}>

          <TextField
            fullWidth
            placeholder="🍅 tomato, 🧀 cheese, 🧅 onion..."
            value={ingredients}
            onChange={(e)=>setIngredients(e.target.value)}
            sx={{
              mb:3,
              input:{color:"#fff"},
              fieldset:{borderColor:"#555"},
              "& .MuiOutlinedInput-root:hover fieldset":{
                borderColor:"#ff9800"
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset":{
                borderColor:"#ff1744"
              }
            }}
          />

          <Button
            startIcon={<AutoAwesomeIcon/>}
            variant="contained"
            onClick={generate}
            sx={{
              background:
                "linear-gradient(45deg,#ff9800,#ff1744)",
              px:5,
              py:1.6,
              fontWeight:800,
              fontSize:16,
              borderRadius:3,
              boxShadow:"0 10px 30px rgba(255,0,0,0.5)",
              "&:hover":{
                transform:"scale(1.07)"
              }
            }}>
            ✨ Generate Recipes
          </Button>

        </Card>

        {/* LOADING */}
        {loading && (
          <CircularProgress
            sx={{mt:5,color:"#ff9800"}}
          />
        )}

        {/* RESULTS */}
        {recipes.length>0 && (
          <Stack spacing={3} mt={6}>

            {recipes.map(r=>(
              <Card key={r._id} sx={{
                p:3,
                background:"rgba(255,255,255,0.08)",
                backdropFilter:"blur(20px)",
                borderRadius:4,
                textAlign:"left",
                border:"1px solid rgba(255,255,255,0.12)",
                boxShadow:"0 10px 40px rgba(0,0,0,0.6)",
                transition:"0.3s",
                "&:hover":{
                  transform:"translateY(-6px)"
                }
              }}>

                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{
                    background:
                      "linear-gradient(45deg,#ff9800,#ff1744)",
                    WebkitBackgroundClip:"text",
                    WebkitTextFillColor:"transparent"
                  }}>
                  🍽️ {r.title}
                </Typography>

                <Typography color="#ccc" mt={1}>
                  👨‍🍳 {r.author?.name}
                </Typography>

                <Stack
                  direction="row"
                  gap={1}
                  mt={2}
                  flexWrap="wrap">

                  {r.ingredients?.slice(0,6).map((i,idx)=>(
                    <Chip
                      key={idx}
                      label={`🥕 ${i}`}
                      sx={{
                        background:
                          "linear-gradient(45deg,#ff9800,#ff5722)",
                        color:"#fff",
                        fontWeight:600
                      }}
                    />
                  ))}

                </Stack>

              </Card>
            ))}

          </Stack>
        )}

      </Container>

    </Box>
  );
}
