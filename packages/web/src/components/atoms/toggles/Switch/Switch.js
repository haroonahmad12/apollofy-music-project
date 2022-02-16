import React, { useState } from "react";
import { func, string } from "prop-types";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDarkMode } from "../../../../hooks/useDarkMode";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setLightMode, themeSelector } from "../../../../store/theme";

const Toggle = () => {
  // const [theme, themeToggler] = useDarkMode();
  const dispatch = useDispatch();

  const { theme } = useSelector(themeSelector);
  const [mode, setMode] = useState(theme);

  const toggleTheme = () => {
    if (mode === "light") {
      setMode("dark");
      dispatch(setDarkMode());
    }

    if (mode === "dark") {
      setMode("light");
      dispatch(setLightMode());
    }
  };

  console.log(mode);

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: 1,
        justifyContent: "center",
        padding: 0,
      }}
    >
      <IconButton sx={{ margin: 0, padding: 0 }} onClick={toggleTheme} color="inherit">
        {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default Toggle;
