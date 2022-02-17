import { createTheme } from "@mui/material/styles";

export default function getTheme(mode) {
  // define light palette for light mode
  const lightPalette = {
    primary: { main: "rgb(176, 74, 255)" },
    secondary: { main: "#9c27b0" },
    divider: "#E5E8EC",
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
    },
    text: {
      disabled: "rgba(0, 0, 0, 0.38)",
      icon: "rgba(255, 255, 255, 0.5)",
      primary: "#20262D",
      secondary: "#2F3A45",
    },
  };

  // define light palette for dark mode
  const darkPalette = {
    primary: { main: "rgb(176, 74, 255)" },
    secondary: { main: "#ce93d8" },
    background: {
      paper: "#0E0E0E",
    },
    action: {
      active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
    },
    text: {
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)",
      primary: "#fff",
      secondary: "#AAB4BE",
    },
  };

  // create a new theme with right palette based on mode
  // this theme object can then be referenced when overriding components
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light" ? lightPalette : darkPalette),
    },
  });

  // create
  return createTheme(theme);
}
