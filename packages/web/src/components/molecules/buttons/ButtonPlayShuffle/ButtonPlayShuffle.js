import React from "react";
import PropTypes from "prop-types";
import { PlayerInterface, Track } from "react-material-music-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Box from '@mui/material/Box';

import Button from "../../../atoms/buttons/Button";

const ButtonPlaySuffle = ({ tracks }) => {
  const playRandom = () => {
    if (tracks.length > 0) {
      const random = tracks[Math.floor(Math.random() * tracks.length)];

      PlayerInterface.play([
        new Track(
          random.id,
          random?.thumbnails?.url_default,
          random?.title,
          random?.user?.username,
          random.url,
        ),
      ]);
    }
  };

  return (
    <Box
      sx={{
        width: "5rem",
        textAlign: 'left',
        maxWidth: "6rem",
        mt: 3,
        mb: 4,
      }}
    >
      <Button
        type="block"
        btnColor="#B04AFF"
        onClick={playRandom}
      >
        <PlayArrowIcon />
        Play
      </Button>
    </Box>
  );
};

ButtonPlaySuffle.propTypes = {
  tracks: PropTypes.object,
};

ButtonPlaySuffle.defaultProps = {
  tracks: {},
};
export default ButtonPlaySuffle;
