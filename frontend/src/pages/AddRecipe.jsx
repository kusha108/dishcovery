import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  LinearProgress,
  Box,
  Card,
  Chip,
  Fade,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import api from "../api/axios";

export default function AddRecipe() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const ingredientList = form.ingredients
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);

  const handleImageChange = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageChange(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("ingredients", JSON.stringify(ingredientList));
    data.append(
      "steps",
      JSON.stringify(form.steps.split(",").map((s) => s.trim()))
    );
    if (image) data.append("image", image);

    try {
      setUploading(true);

      await api.post("/recipes", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUploading(false);
      setAlert(true);
      setForm({ title: "", description: "", ingredients: "", steps: "" });
      setImage(null);
      setPreview(null);
    } catch {
      setUploading(false);
      setError(true);
    }
  };

  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Emoji Background */}
        <Typography
          sx={{
            position: "absolute",
            fontSize: "120px",
            opacity: 0.05,
            top: "10%",
            left: "5%",
          }}
        >
          🍕🍔🍜
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            fontSize: "120px",
            opacity: 0.05,
            bottom: "10%",
            right: "5%",
          }}
        >
          🍩🍓🥗
        </Typography>

        <Container maxWidth="sm">
          <Card
            sx={{
              p: 4,
              borderRadius: 5,
              backdropFilter: "blur(18px)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
              color: "#fff",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={900}
              mb={3}
              textAlign="center"
              sx={{
                background:
                  "linear-gradient(45deg,#ff9800,#ff1744)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🍽️ Add Recipe
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Recipe Title"
                name="title"
                fullWidth
                required
                margin="normal"
                value={form.title}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#ddd" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={inputStyle}
              />

              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                margin="normal"
                value={form.description}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#ddd" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={inputStyle}
              />

              <TextField
                label="Ingredients (comma separated)"
                name="ingredients"
                fullWidth
                margin="normal"
                value={form.ingredients}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#ddd" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={inputStyle}
              />

              <Box mt={1} mb={2} display="flex" gap={1} flexWrap="wrap">
                {ingredientList.map((i, idx) => (
                  <Chip
                    key={idx}
                    label={`🥕 ${i}`}
                    sx={{
                      background:
                        "linear-gradient(45deg,#ff9800,#ff5722)",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>

              <TextField
                label="Steps (comma separated)"
                name="steps"
                fullWidth
                margin="normal"
                value={form.steps}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#ddd" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={inputStyle}
              />

              <Box
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                sx={{
                  mt: 3,
                  p: 3,
                  border: "2px dashed #ff9800",
                  borderRadius: 4,
                  textAlign: "center",
                  cursor: "pointer",
                  background:
                    "linear-gradient(145deg, rgba(255,152,0,0.1), rgba(255,0,0,0.1))",
                }}
              >
                <Typography color="#ffd180">
                  📸 Drag & drop food image
                </Typography>

                <Button component="label" sx={{ color: "#ff9800" }}>
                  Upload Image
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(e.target.files[0])
                    }
                  />
                </Button>

                {preview && (
                  <Box
                    component="img"
                    src={preview}
                    sx={{
                      width: "100%",
                      mt: 2,
                      borderRadius: 3,
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,0.6)",
                    }}
                  />
                )}
              </Box>

              {uploading && (
                <LinearProgress
                  sx={{ mt: 2, borderRadius: 2 }}
                  color="warning"
                />
              )}

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 800,
                  fontSize: "16px",
                  background:
                    "linear-gradient(45deg,#ff9800,#ff1744)",
                  color: "#fff",
                  borderRadius: 3,
                  boxShadow:
                    "0 10px 25px rgba(255,0,0,0.5)",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                🚀 Submit Recipe
              </Button>
            </form>
          </Card>
        </Container>

        <Snackbar
          open={alert}
          autoHideDuration={2000}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon sx={{ mr: 1 }} />
              Recipe added!
            </span>
          }
        />

        <Snackbar
          open={error}
          autoHideDuration={2000}
          message="Upload failed"
        />
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
