import React from "react";
import { useSelector } from "react-redux";
import Player from "react-material-music-player";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { themeSelector } from "../../../../store/theme";
import makeTheme from "../../../../styles/audioPlayerTheme";

const AudioPlayer = () => {
  const { theme } = useSelector(themeSelector);

  const mode = makeTheme(theme);

  return (
    <ThemeProvider theme={mode}>
      <Player
        sx={{
          "@media screen and (max-width: 992px)": { bottom: "4.2rem", boxShadow: "none" },
        }}
      />
    </ThemeProvider>
  );
};

export default AudioPlayer;
