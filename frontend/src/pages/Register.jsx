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
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);

      console.log("SUCCESS:", res.data);

      setAlertOpen(true);

      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);

      setErrorMsg(
        err.response?.data?.message ||
        "Registration failed. Try different email."
      );
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

        <Card sx={{
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
        }}>

          <Typography variant="h4" fontWeight={900} mb={2} textAlign="center">
            🍽️ Create Account
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
              }}
            >
              🚀 Register
            </Button>

          </form>

          {errorMsg && (
            <Typography color="error" mt={2} textAlign="center">
              {errorMsg}
            </Typography>
          )}

          <Snackbar
            open={alertOpen}
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
  },
};
