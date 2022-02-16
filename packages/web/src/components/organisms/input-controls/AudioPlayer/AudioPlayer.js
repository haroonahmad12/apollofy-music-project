import React from "react";
import Player from "react-material-music-player";

const AudioPlayer = () => {

  const [mode, setMode] = React.useState("system");
  const theme = makeTheme(mode === "system" ? (isDark ? "dark" : "light") : mode);

  return (
    <Player
      sx={{
        "@media screen and (max-width: 992px)": { bottom: "4.2rem", boxShadow: "none" },
      }}
    />
  );
};

export default AudioPlayer;
