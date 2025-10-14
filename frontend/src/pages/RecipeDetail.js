// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Card,
//   CardMedia,
//   Divider,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import api from "../api/axios";
// import { useParams, useNavigate } from "react-router-dom";

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const backendURL = "http://localhost:5000";
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   // ✅ Fetch recipe by ID
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await api.get(`/recipes/${id}`);
//         setRecipe(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching recipe:", err);
//       }
//     };
//     fetchRecipe();
//   }, [id]);

//   // ✅ Delete recipe handler
//   const handleDelete = async () => {
//     try {
//       await api.delete(`/recipes/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("✅ Recipe deleted successfully!");
//       navigate("/recipes");
//     } catch (err) {
//       console.error("❌ Error deleting recipe:", err);
//       alert("Failed to delete recipe. Try again.");
//     } finally {
//       setOpenDialog(false);
//     }
//   };

//   if (!recipe)
//     return (
//       <Typography align="center" mt={5}>
//         Loading recipe details...
//       </Typography>
//     );

//   return (
//     <Container sx={{ mt: 5, mb: 5 }}>
//       <Card sx={{ boxShadow: 5, borderRadius: 3, p: 3 }}>
//         {recipe.image && (
//           <CardMedia
//             component="img"
//             image={`${backendURL}/${recipe.image}`}
//             alt={recipe.title}
//             sx={{
//               borderRadius: 2,
//               mb: 3,
//               maxHeight: 400,
//               objectFit: "cover",
//             }}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src =
//                 "https://via.placeholder.com/600x400.png?text=Image+Not+Available";
//             }}
//           />
//         )}

//         <Typography variant="h4" fontWeight={700}>
//           {recipe.title}
//         </Typography>

//         <Typography
//           variant="subtitle1"
//           color="text.secondary"
//           sx={{ mt: 1, mb: 2 }}
//         >
//           👨‍🍳 By {recipe.author?.name || "Anonymous"}
//         </Typography>

//         <Divider sx={{ my: 2 }} />

//         <Typography
//           variant="body1"
//           sx={{ mb: 3, fontSize: "1rem", lineHeight: 1.6 }}
//         >
//           {recipe.description}
//         </Typography>

//         <Typography variant="h6" sx={{ mt: 3 }}>
//           🧂 Ingredients:
//         </Typography>
//         <Box component="ul" sx={{ pl: 3 }}>
//           {recipe.ingredients.map((item, index) => (
//             <li key={index}>
//               <Typography variant="body2">{item}</Typography>
//             </li>
//           ))}
//         </Box>

//         <Typography variant="h6" sx={{ mt: 3 }}>
//           👨‍🍳 Steps:
//         </Typography>
//         <Box component="ol" sx={{ pl: 3 }}>
//           {recipe.steps.map((step, index) => (
//             <li key={index}>
//               <Typography variant="body2">{step}</Typography>
//             </li>
//           ))}
//         </Box>

//         {/* ✅ Delete button (only visible to recipe owner) */}
//         {user?._id === recipe.author?._id && (
//           <Box sx={{ mt: 4 }}>
//             <Button
//               variant="contained"
//               color="error"
//               startIcon={<DeleteIcon />}
//               onClick={() => setOpenDialog(true)}
//               sx={{ textTransform: "none", fontWeight: 600 }}
//             >
//               Delete Recipe
//             </Button>
//           </Box>
//         )}
//       </Card>

//       {/* ✅ Confirmation Dialog */}
//       <Dialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         aria-labelledby="delete-dialog-title"
//       >
//         <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this recipe? This action cannot be
//             undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDelete} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const backendURL = "http://localhost:5000";
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("❌ Error fetching recipe:", err);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Recipe deleted successfully!");
      navigate("/recipes");
    } catch (err) {
      console.error("❌ Error deleting recipe:", err);
      alert("Failed to delete recipe. Try again.");
    } finally {
      setOpenDialog(false);
    }
  };

  if (!recipe)
    return (
      <Typography align="center" mt={5}>
        Loading recipe details...
      </Typography>
    );

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0f0f1a 0%, #1a1b2e 50%, #101020 100%)",
          backgroundSize: "400% 400%",
          animation: "bgMove 12s ease infinite",
          py: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 💫 Gradient Glows */}
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

        {/* 🌙 Content */}
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Card
            sx={{
              boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
              borderRadius: 4,
              p: 3,
              backdropFilter: "blur(16px)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff",
            }}
          >
            {/* Image Section */}
            {recipe.image && (
              <CardMedia
                component="img"
                image={`${backendURL}/${recipe.image}`}
                alt={recipe.title}
                sx={{
                  borderRadius: 3,
                  mb: 4,
                  maxHeight: 450,
                  objectFit: "cover",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/600x400.png?text=Image+Not+Available";
                }}
              />
            )}

            {/* Title & Author */}
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              sx={{
                background:
                  "linear-gradient(90deg, #ff8a00, #e52e71, #9b00ff, #007aff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {recipe.title}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}
            >
              👨‍🍳 By {recipe.author?.name || "Anonymous"}
            </Typography>

            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {recipe.description}
            </Typography>

            {/* Ingredients */}
            <Typography
              variant="h6"
              sx={{
                mt: 3,
                mb: 1,
                color: "#ff8a00",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              🧂 Ingredients:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              {recipe.ingredients.map((item, index) => (
                <li key={index}>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {item}
                  </Typography>
                </li>
              ))}
            </Box>

            {/* Steps */}
            <Typography
              variant="h6"
              sx={{
                mt: 3,
                mb: 1,
                color: "#9b00ff",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              👨‍🍳 Steps:
            </Typography>
            <Box component="ol" sx={{ pl: 3 }}>
              {recipe.steps.map((step, index) => (
                <li key={index}>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {step}
                  </Typography>
                </li>
              ))}
            </Box>

            {/* Delete Button */}
            {user?._id === recipe.author?._id && (
              <Box sx={{ mt: 5 }}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setOpenDialog(true)}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1.2,
                    borderRadius: 3,
                    boxShadow: "0px 4px 15px rgba(255,0,0,0.3)",
                  }}
                >
                  Delete Recipe
                </Button>
              </Box>
            )}
          </Card>
        </Container>

        {/* 🔥 Background Animation */}
        <style>{`
          @keyframes bgMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this recipe? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
}
