// import React, { useState } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Snackbar,
//   LinearProgress,
//   Box,
//   Card,
//   CardMedia,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import api from "../api/axios";

// export default function AddRecipe() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     ingredients: "",
//     steps: "",
//   });
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [alert, setAlert] = useState(false);
//   const [error, setError] = useState(false);

//   // ✅ Handle text input changes
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // ✅ Handle image preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   // ✅ Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     // ✅ Build FormData properly
//     const data = new FormData();
//     data.append("title", form.title);
//     data.append("description", form.description);
//     data.append(
//       "ingredients",
//       JSON.stringify(form.ingredients.split(",").map((i) => i.trim()))
//     );
//     data.append(
//       "steps",
//       JSON.stringify(form.steps.split(",").map((s) => s.trim()))
//     );
//     if (image) data.append("image", image);

//     try {
//       setUploading(true);
//       await api.post("/recipes", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           console.log(`Upload Progress: ${progress}%`);
//         },
//       });

//       // ✅ Success
//       setUploading(false);
//       setAlert(true);
//       setForm({ title: "", description: "", ingredients: "", steps: "" });
//       setImage(null);
//       setPreview(null);
//     } catch (error) {
//       console.error("❌ Upload failed:", error.response?.data || error.message);
//       setUploading(false);
//       setError(true);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
//       <Card
//         sx={{
//           p: 3,
//           boxShadow: 5,
//           borderRadius: 3,
//           background: "#fafafa",
//         }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight={700}
//           mb={3}
//           sx={{ textAlign: "center", color: "#2C2C2C" }}
//         >
//           Add New Recipe
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             name="title"
//             fullWidth
//             required
//             margin="normal"
//             value={form.title}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Description"
//             name="description"
//             fullWidth
//             multiline
//             rows={3}
//             margin="normal"
//             value={form.description}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Ingredients (comma separated)"
//             name="ingredients"
//             fullWidth
//             margin="normal"
//             value={form.ingredients}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Steps (comma separated)"
//             name="steps"
//             fullWidth
//             margin="normal"
//             value={form.steps}
//             onChange={handleChange}
//           />

//           {/* ✅ Image Upload + Preview */}
//           <Box mt={2} mb={2}>
//             <Button
//               variant="contained"
//               component="label"
//               sx={{
//                 backgroundColor: "#2C2C2C",
//                 "&:hover": { backgroundColor: "#444" },
//               }}
//             >
//               Upload Image
//               <input
//                 hidden
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </Button>

//             {preview && (
//               <CardMedia
//                 component="img"
//                 image={preview}
//                 alt="Preview"
//                 sx={{
//                   mt: 2,
//                   borderRadius: 2,
//                   maxHeight: 200,
//                   objectFit: "cover",
//                 }}
//               />
//             )}
//           </Box>

//           {uploading && (
//             <Box sx={{ width: "100%", mb: 2 }}>
//               <LinearProgress color="success" />
//             </Box>
//           )}

//           <Button
//             type="submit"
//             variant="contained"
//             color="success"
//             fullWidth
//             sx={{ mt: 2, py: 1.2, fontWeight: 600 }}
//           >
//             Submit
//           </Button>
//         </form>
//       </Card>

//       {/* ✅ Success Snackbar */}
//       <Snackbar
//         open={alert}
//         autoHideDuration={2500}
//         onClose={() => setAlert(false)}
//         message={
//           <span style={{ display: "flex", alignItems: "center" }}>
//             <CheckCircleIcon sx={{ mr: 1, color: "#4caf50" }} /> Recipe added
//             successfully!
//           </span>
//         }
//       />

//       {/* ❌ Error Snackbar */}
//       <Snackbar
//         open={error}
//         autoHideDuration={2500}
//         onClose={() => setError(false)}
//         message="Upload failed! Please check your inputs or try again."
//         sx={{ backgroundColor: "#ff1744" }}
//       />
//     </Container>
//   );
// }
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
  CardMedia,
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append(
      "ingredients",
      JSON.stringify(form.ingredients.split(",").map((i) => i.trim()))
    );
    data.append(
      "steps",
      JSON.stringify(form.steps.split(",").map((s) => s.trim()))
    );
    if (image) data.append("image", image);

    try {
      setUploading(true);
      await api.post("/recipes", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUploading(false);
      setAlert(true);
      setForm({ title: "", description: "", ingredients: "", steps: "" });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("❌ Upload failed:", error.response?.data || error.message);
      setUploading(false);
      setError(true);
    }
  };

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0f0f1a 0%, #1a1b2e 50%, #101020 100%)",
          backgroundSize: "400% 400%",
          animation: "bgShift 12s ease infinite",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          px: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glowing background accents */}
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
            zIndex: 0,
            filter: "blur(120px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "350px",
            height: "350px",
            background:
              "radial-gradient(circle, rgba(0,122,255,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
            filter: "blur(120px)",
          }}
        />

        {/* Form Card */}
        <Container maxWidth="sm" sx={{ zIndex: 2 }}>
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
              Add New Recipe 🍴
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                required
                margin="normal"
                value={form.title}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "#ff8a00" },
                    "&.Mui-focused fieldset": { borderColor: "#e52e71" },
                  },
                }}
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
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "#ff8a00" },
                    "&.Mui-focused fieldset": { borderColor: "#e52e71" },
                  },
                }}
              />
              <TextField
                label="Ingredients (comma separated)"
                name="ingredients"
                fullWidth
                margin="normal"
                value={form.ingredients}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "#ff8a00" },
                    "&.Mui-focused fieldset": { borderColor: "#e52e71" },
                  },
                }}
              />
              <TextField
                label="Steps (comma separated)"
                name="steps"
                fullWidth
                margin="normal"
                value={form.steps}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "#ff8a00" },
                    "&.Mui-focused fieldset": { borderColor: "#e52e71" },
                  },
                }}
              />

              {/* Image Upload */}
              <Box mt={2} mb={2}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    background:
                      "linear-gradient(90deg, #ff8a00, #e52e71, #9b00ff)",
                    color: "#fff",
                    fontWeight: 600,
                    px: 3,
                    py: 1.2,
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow: "0 4px 15px rgba(229, 46, 113, 0.3)",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 6px 20px rgba(229, 46, 113, 0.5)",
                      transition: "0.3s",
                    },
                  }}
                >
                  Upload Image
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>

                {preview && (
                  <CardMedia
                    component="img"
                    image={preview}
                    alt="Preview"
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      maxHeight: 200,
                      objectFit: "cover",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                    }}
                  />
                )}
              </Box>

              {uploading && (
                <Box sx={{ width: "100%", mb: 2 }}>
                  <LinearProgress color="secondary" />
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.2,
                  fontWeight: 600,
                  background:
                    "linear-gradient(90deg, #ff8a00, #e52e71, #9b00ff)",
                  color: "#fff",
                  borderRadius: 3,
                  textTransform: "none",
                  "&:hover": {
                    transform: "scale(1.03)",
                    transition: "0.3s",
                  },
                }}
              >
                Submit
              </Button>
            </form>
          </Card>
        </Container>

        {/* Snackbar Alerts */}
        <Snackbar
          open={alert}
          autoHideDuration={2500}
          onClose={() => setAlert(false)}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon sx={{ mr: 1, color: "#4caf50" }} /> Recipe added
              successfully!
            </span>
          }
        />

        <Snackbar
          open={error}
          autoHideDuration={2500}
          onClose={() => setError(false)}
          message="Upload failed! Please check your inputs or try again."
          sx={{ backgroundColor: "#ff1744" }}
        />

        {/* Background Animation */}
        <style>{`
          @keyframes bgShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </Box>
    </Fade>
  );
}
