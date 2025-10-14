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
    await api.post("/auth/register", form);
    setAlert(true);
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "radial-gradient(circle at 20% 30%, #1b0034, #090a0f)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 6,
        }}
      >
        <Card
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 4,
            boxShadow: "0 8px 25px rgba(255, 0, 150, 0.15)",
            background: "rgba(30, 30, 40, 0.9)",
            backdropFilter: "blur(12px)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            mb={3}
            sx={{
              background: "linear-gradient(90deg, #ff8a00, #e52e71, #9b00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.8px",
            }}
          >
            Create Your Account 🍴
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#bbb",
              mb: 3,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Join <strong>Dishcovery</strong> and start sharing your recipes
            today!
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: "#7b1fa2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#e52e71",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff8a00",
                  },
                },
              }}
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: "#7b1fa2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#e52e71",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff8a00",
                  },
                },
              }}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: "#7b1fa2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#e52e71",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff8a00",
                  },
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
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 3,
                textTransform: "none",
                background: "linear-gradient(90deg, #ff8a00, #e52e71, #9b00ff)",
                boxShadow: "0 4px 15px rgba(229,46,113,0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #ff9800, #ff4081, #651fff)",
                  boxShadow: "0 6px 18px rgba(229,46,113,0.5)",
                  transform: "translateY(-2px)",
                  transition: "0.3s",
                },
              }}
            >
              Register
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{
              color: "#bbb",
              mt: 3,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Already have an account?{" "}
            <Box
              component="span"
              sx={{
                color: "#e52e71",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/login")}
            >
              Login here
            </Box>
          </Typography>

          <Snackbar
            open={alert}
            autoHideDuration={2000}
            message="🎉 Registration successful!"
            onClose={() => setAlert(false)}
          />
        </Card>
      </Box>
    </Fade>
  );
}
