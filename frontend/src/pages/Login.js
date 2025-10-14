import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Box,
  Card,
  Fade,
} from "@mui/material";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setAlert(true);
      setTimeout(() => navigate("/recipes"), 1500);
    } catch (err) {
      alert("Invalid credentials");
      console.error("❌ Login error:", err);
    }
  };

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0f0f1a 0%, #1a1b2e 50%, #101020 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 🔮 Glowing background accents */}
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
            filter: "blur(120px)",
            zIndex: 0,
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
            filter: "blur(120px)",
            zIndex: 0,
          }}
        />

        {/* 🧊 Glassmorphic Login Card */}
        <Container maxWidth="xs" sx={{ position: "relative", zIndex: 2 }}>
          <Card
            sx={{
              p: 4,
              boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
              borderRadius: 4,
              backdropFilter: "blur(16px)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.05))",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              mb={3}
              textAlign="center"
              sx={{
                background:
                  "linear-gradient(90deg, #ff8a00, #e52e71, #9b00ff, #007aff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Login 🔐
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                margin="normal"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "#ff8a00" },
                    "&.Mui-focused fieldset": { borderColor: "#e52e71" },
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                fullWidth
                required
                margin="normal"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "#ff8a00" },
                    "&.Mui-focused fieldset": { borderColor: "#9b00ff" },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.3,
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 3,
                  background:
                    "linear-gradient(90deg, #ff8a00, #e52e71, #9b00ff)",
                  boxShadow: "0 4px 15px rgba(229,46,113,0.3)",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 6px 20px rgba(229,46,113,0.5)",
                    transition: "0.3s",
                  },
                }}
              >
                Login
              </Button>
            </form>

            <Snackbar
              open={alert}
              autoHideDuration={1500}
              message="Login successful!"
              sx={{ mt: 2 }}
            />
          </Card>
        </Container>
      </Box>
    </Fade>
  );
}
