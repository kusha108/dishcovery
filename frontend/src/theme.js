import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {
    mode: "dark",

    primary: {
      main: "#ff1e1e",   // red
    },

    secondary: {
      main: "#ffffff",   // white
    },

    background: {
      default: "#0b0b0f", // black
      paper: "#111117",
    },

    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },

  typography: {
    fontFamily: "Poppins, sans-serif",

    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
  },

  shape: {
    borderRadius: 12,
  },

  components: {

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },

  },

});

export default theme;
