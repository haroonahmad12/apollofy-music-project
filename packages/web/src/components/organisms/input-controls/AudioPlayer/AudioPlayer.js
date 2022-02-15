import React from "react";
import Player from "react-material-music-player"; // default export
import styled from "styled-components";

const CustomPlayer = styled(Player)`
  width: 100vw;
  position: absolute;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    bottom: 4.2rem;
    boxShadow: none;
  } ;
`;

const AudioPlayer = () => {
  return (
    <Player
      sx={{
        "@media screen and (max-width: 992px)": { bottom: "4.2rem", boxShadow: "none" },
      }}
    />
  );
};

export default AudioPlayer;