import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  Fade,
  Stack,
  Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);
  const [aiFeed, setAiFeed] = useState([]);
  const [saved, setSaved] = useState([]);
  const [liked, setLiked] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);

    if (!u) return;

    api.get("/recipes").then((res) => {
      const list = res.data.data || res.data;
      const mine = list.filter(
        (r) => r.author === u._id || r.author?._id === u._id
      );
      setMyRecipes(mine);
    });

    api
      .get("/ai/personal", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAiFeed(res.data.data || res.data))
      .catch(() => {});

    api
      .get(`/users/${u._id}`)
      .then((res) => {
        setSaved(res.data.savedRecipes || []);
        setLiked(res.data.likedRecipes || []);
      })
      .catch(() => {});
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Fade in timeout={700}>
      <Box
        sx={{
          minHeight: "100vh",
          position:"relative",
          overflow:"hidden",
          color:"#fff",
          p: { xs: 2, md: 5 },

          background:
            "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
        }}
      >

        {/* EMOJI WALL */}
        <Box sx={{
          position:"absolute",
          inset:0,
          opacity:0.05,
          fontSize:60
        }}>
          {"🍕🍔🍣🍜🍩🥗".repeat(30)}
        </Box>

        {/* GLOWS */}
        <Box sx={{
          position:"absolute",
          width:350,
          height:350,
          background:"radial-gradient(#ff980055,transparent 70%)",
          top:"5%",
          left:"5%",
          filter:"blur(100px)"
        }}/>
        <Box sx={{
          position:"absolute",
          width:350,
          height:350,
          background:"radial-gradient(#ff174455,transparent 70%)",
          bottom:"5%",
          right:"5%",
          filter:"blur(100px)"
        }}/>

        {/* ========= USER CARD ========= */}
        <Card
          sx={{
            p: 4,
            mb: 5,
            borderRadius: 5,
            backdropFilter: "blur(22px)",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            position:"relative",
            zIndex:2,
            boxShadow:"0 20px 60px rgba(0,0,0,0.8)"
          }}
        >
          <Stack direction="row" spacing={3} alignItems="center">

            <Avatar
              sx={{
                width: 95,
                height: 95,
                fontSize: 40,
                fontWeight:800,
                background:
                  "linear-gradient(45deg,#ff9800,#ff1744)",
                boxShadow:"0 0 25px rgba(255,0,0,0.6)"
              }}
            >
              {user?.name?.[0]}
            </Avatar>

            <Box flex={1}>
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  background:
                    "linear-gradient(45deg,#ff9800,#ff1744)",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",
                }}
              >
                {user?.name}
              </Typography>

              <Typography sx={{ opacity: 0.8 }}>
                📧 {user?.email}
              </Typography>

              {/* STATS */}
              <Stack direction="row" spacing={2} mt={2}>
                <Chip
                  icon={<RestaurantIcon />}
                  label={`${myRecipes.length} Recipes`}
                  sx={{
                    background:
                      "linear-gradient(45deg,#ff9800,#ff5722)",
                    color: "#fff",
                    fontWeight:700
                  }}
                />

                <Chip
                  icon={<BookmarkIcon />}
                  label={`${saved.length} Saved`}
                  sx={{
                    background:"rgba(255,255,255,0.1)",
                    color:"#fff"
                  }}
                />

                <Chip
                  icon={<FavoriteIcon />}
                  label={`${liked.length} Liked`}
                  sx={{
                    background:"rgba(255,255,255,0.1)",
                    color:"#fff"
                  }}
                />
              </Stack>
            </Box>

            <Button
              onClick={logout}
              sx={{
                background:
                  "linear-gradient(45deg,#ff9800,#ff1744)",
                color: "#fff",
                px: 4,
                py: 1.2,
                fontWeight: 800,
                borderRadius:3,
                "&:hover":{
                  transform:"scale(1.05)"
                }
              }}
            >
              🚪 Logout
            </Button>

          </Stack>
        </Card>

        {/* ========= SECTIONS ========= */}
        <Section title="👨‍🍳 My Recipes" data={myRecipes} />
        <Section title="📌 Saved Recipes" data={saved} />
        <Section title="❤️ Liked Recipes" data={liked} />
        <Section title="🤖 AI Picks For You" data={aiFeed} />

      </Box>
    </Fade>
  );
}

/* ========= HORIZONTAL SECTION ========= */

function Section({ title, data }) {
  if (!data?.length) return null;

  return (
    <Box mb={6} position="relative" zIndex={2}>
      <Typography
        variant="h5"
        mb={2}
        fontWeight={800}
        sx={{
          background:
            "linear-gradient(45deg,#ff9800,#ff1744)",
          WebkitBackgroundClip:"text",
          WebkitTextFillColor:"transparent",
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          pb: 2,

          "&::-webkit-scrollbar":{
            height:8
          },
          "&::-webkit-scrollbar-thumb":{
            background:"#ff1744",
            borderRadius:10
          }
        }}
      >
        {data.map((r) => (
          <RecipeCard key={r._id} recipe={r} />
        ))}
      </Box>
    </Box>
  );
}

