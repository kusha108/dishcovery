import React, { useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RecipeCard from "./RecipeCard";

export default function Row({ title, data = [] }) {
  const rowRef = useRef();

  const scroll = (dir) => {
    const { current } = rowRef;
    if (!current) return;

    const scrollAmount = 320;

    current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!data.length) return null;

  return (
    <Box sx={{ mb: 6, px: { xs: 2, md: 6 } }}>
      {/* ===== TITLE + ARROWS ===== */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#fff",
            letterSpacing: 1,
          }}
        >
          {title}
        </Typography>

        <Box>
          <IconButton onClick={() => scroll("left")}>
            <ChevronLeftIcon sx={{ color: "#ff1e1e" }} />
          </IconButton>

          <IconButton onClick={() => scroll("right")}>
            <ChevronRightIcon sx={{ color: "#ff1e1e" }} />
          </IconButton>
        </Box>
      </Box>

      {/* ===== HORIZONTAL SCROLL ===== */}
      <Box
        ref={rowRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {data.map((recipe) => (
          <Box
            key={recipe._id}
            sx={{
              minWidth: 280,
              transition: "0.4s",
              "&:hover": {
                transform: "scale(1.08)",
                zIndex: 5,
              },
            }}
          >
            <RecipeCard recipe={recipe} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
