
import React, { useState } from "react";
import {
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

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      setAlert(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow:"hidden",
          color:"#fff",

          background:
            "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
        }}
      >

        {/* EMOJI BACKGROUND */}
        <Box sx={{
          position:"absolute",
          inset:0,
          opacity:0.06,
          fontSize:60
        }}>
          {"🍕🍔🍣🍜🍩🥗".repeat(25)}
        </Box>

        {/* COLOR GLOWS */}
        <Box sx={{
          position:"absolute",
          width:350,
          height:350,
          background:"radial-gradient(#ff980055,transparent 70%)",
          top:"10%",
          left:"10%",
          filter:"blur(100px)"
        }}/>

        <Box sx={{
          position:"absolute",
          width:350,
          height:350,
          background:"radial-gradient(#ff174455,transparent 70%)",
          bottom:"10%",
          right:"10%",
          filter:"blur(100px)"
        }}/>

        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 5,
            backdropFilter: "blur(22px)",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
            color: "#fff",
            zIndex: 2,
          }}
        >

          <Typography
            variant="h4"
            fontWeight={900}
            mb={1}
            textAlign="center"
            sx={{
              background:
                "linear-gradient(45deg,#ff9800,#ff1744)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
            }}
          >
            🍽️ Create Account
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            mb={3}
            sx={{ color: "#ccc" }}
          >
            Join Dishcovery & share your recipes 🍴
          </Typography>

          <form onSubmit={handleSubmit}>

            <TextField
              label="Full Name"
              fullWidth
              required
              margin="normal"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              InputLabelProps={{ style: { color: "#ddd" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={inputStyle}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              InputLabelProps={{ style: { color: "#ddd" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={inputStyle}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              InputLabelProps={{ style: { color: "#ddd" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={inputStyle}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 800,
                borderRadius: 3,
                textTransform: "none",
                fontSize: 16,
                background:
                  "linear-gradient(45deg,#ff9800,#ff1744)",
                boxShadow:
                  "0 10px 30px rgba(255,0,0,0.5)",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              🚀 Register
            </Button>

          </form>

          <Typography
            textAlign="center"
            mt={3}
            sx={{ color: "#ccc", fontSize: 14 }}
          >
            Already have an account?{" "}
            <span
              style={{
                background:
                  "linear-gradient(45deg,#ff9800,#ff1744)",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                cursor: "pointer",
                fontWeight: 700,
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>

          <Snackbar
            open={alert}
            autoHideDuration={1500}
            message="Registration successful!"
          />

        </Card>
      </Box>
    </Fade>
  );
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#555" },
    "&:hover fieldset": { borderColor: "#ff9800" },
    "&.Mui-focused fieldset": { borderColor: "#ff1744" },
  },
};
