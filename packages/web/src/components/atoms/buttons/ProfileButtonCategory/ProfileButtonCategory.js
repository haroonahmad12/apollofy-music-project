import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import AlbumIcon from "@mui/icons-material/Album";

const ButtonCategory = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  margin: 0 1rem 0 0;
  border-radius: 2rem 2rem 2rem 2rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.label};
    color: white;
  }
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    width: auto;
  }
`;

const StyledSpanCategory = styled.div`
  padding-left: 5px;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: none;
    width: 20px;
  }
`;

const CategoryButton = ({ text }) => {
  switch (text) {
    case "Tracks":
      return (
        <ButtonCategory>
          <MusicNoteIcon />
          <StyledSpanCategory>{text}</StyledSpanCategory>
        </ButtonCategory>
      );

    case "Playlists":
      return (
        <ButtonCategory>
          <PlaylistPlayIcon />
          <StyledSpanCategory>{text}</StyledSpanCategory>
        </ButtonCategory>
      );

    case "Albums":
      return (
        <ButtonCategory>
          <AlbumIcon />
          <StyledSpanCategory>{text}</StyledSpanCategory>
        </ButtonCategory>
      );

    default:
      return (
        <ButtonCategory>
          <span>{text}</span>
        </ButtonCategory>
      );
  }
};

CategoryButton.propTypes = {
  text: PropTypes.string,
};

CategoryButton.defaultProps = {
  text: "",
};

export default CategoryButton;
