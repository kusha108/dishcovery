
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(270deg, #ff8a00, #e52e71, #9b00ff, #007aff, #ff8a00)",
        backgroundSize: "600% 600%",
        animation: "gradientShift 12s ease infinite",
        boxShadow: "0px 3px 15px rgba(0,0,0,0.4)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* ========== LOGO + NAME ========== */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: 1,
          }}
          onClick={() => navigate("/")}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #ff8a00, #e52e71, #9b00ff, #007aff)",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            🍴
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Pacifico', cursive",
              fontWeight: 700,
              background:
                "linear-gradient(90deg, #fff, #ffd700, #ff8a00, #fff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 0px 15px rgba(255, 255, 255, 0.2)",
              letterSpacing: "1px",
            }}
          >
            Dishcovery
          </Typography>
        </Box>

        {/* ========== NAV BUTTONS ========== */}
        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            sx={{
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                color: "#ffd700",
                transform: "scale(1.1)",
                transition: "0.3s",
              },
            }}
          >
            Home
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/recipes")}
            sx={{
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                color: "#ff8a00",
                transform: "scale(1.1)",
                transition: "0.3s",
              },
            }}
          >
            Recipes
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/add")}
            sx={{
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                color: "#e52e71",
                transform: "scale(1.1)",
                transition: "0.3s",
              },
            }}
          >
            Add Recipe
          </Button>

          {/* ✅ Show Logout if user logged in, else show Login + Register */}
          {user ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  color: "#ff1744",
                  transform: "scale(1.1)",
                  transition: "0.3s",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    color: "#00e5ff",
                    transform: "scale(1.1)",
                    transition: "0.3s",
                  },
                }}
              >
                Login
              </Button>

              <Button
                color="inherit"
                onClick={() => navigate("/register")}
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    color: "#ffea00",
                    transform: "scale(1.1)",
                    transition: "0.3s",
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>

      {/* Keyframes animation */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </AppBar>
  );
}
