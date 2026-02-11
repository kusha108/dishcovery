import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      user = JSON.parse(stored);
    }
  } catch {}

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(14px)",
        background: "rgba(15,15,20,0.75)",
        borderBottom: "1px solid rgba(255,152,0,0.25)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
        }}
      >
        {/* ========= LOGO + NAME ========= */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background:
                "linear-gradient(45deg,#ff9800,#ff1744)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "#fff",
              boxShadow:
                "0 0 18px rgba(255,100,0,0.8)",
            }}
          >
            🍽
          </Box>

          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 1,
              background:
                "linear-gradient(45deg,#ff9800,#ff1744)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dishcovery
          </Typography>
        </Box>

        {/* ========= NAV LINKS ========= */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <NavBtn text="🏠 Home" fn={() => navigate("/")} />
          <NavBtn text="🍜 Recipes" fn={() => navigate("/recipes")} />
          <NavBtn text="🤖 AI Studio" fn={() => navigate("/ai")} />
          <NavBtn text="➕ Add Recipe" fn={() => navigate("/add")} />

          {!user ? (
            <>
              <NavBtn text="Login" fn={() => navigate("/login")} />
              <NavBtn text="Register" fn={() => navigate("/register")} />
            </>
          ) : (
            <>
              <Avatar
                onClick={() => navigate("/profile")}
                sx={{
                  width: 38,
                  height: 38,
                  cursor: "pointer",
                  fontWeight: 700,
                  background:
                    "linear-gradient(45deg,#ff9800,#ff1744)",
                  boxShadow:
                    "0 0 15px rgba(255,100,0,0.7)",
                }}
              >
                {user.name?.[0]?.toUpperCase()}
              </Avatar>

              <Button
                onClick={handleLogout}
                sx={{
                  color: "#ddd",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 2,
                  background: "rgba(255,255,255,0.05)",
                  "&:hover": {
                    color: "#fff",
                    background:
                      "linear-gradient(45deg,#ff9800,#ff1744)",
                  },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

/* ========= NAV BUTTON ========= */

function NavBtn({ text, fn }) {
  return (
    <Button
      onClick={fn}
      sx={{
        color: "#eee",
        fontWeight: 600,
        textTransform: "none",
        fontSize: 15,
        position: "relative",
        borderRadius: 2,
        px: 2,

        "&:hover": {
          color: "#fff",
          background: "rgba(255,255,255,0.08)",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "0%",
          height: "2px",
          background:
            "linear-gradient(45deg,#ff9800,#ff1744)",
          transition: "0.25s",
        },

        "&:hover::after": {
          width: "100%",
        },
      }}
    >
      {text}
    </Button>
  );
}
