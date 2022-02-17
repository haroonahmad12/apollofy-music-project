import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Typography } from "@mui/material";

import ButtonFollowPlaylist from "../../buttons/ButtonFollowPlaylist";

const StyledTitlePlaylist = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ProfilePlaylistTitle = ({ title, id }) => {
  return (
    <StyledTitlePlaylist>
      <div>
        <Typography variant="h5">{title}</Typography>
      </div>
      <div>
        <ButtonFollowPlaylist id={id} />
      </div>
    </StyledTitlePlaylist>
  );
};

ProfilePlaylistTitle.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
};

ProfilePlaylistTitle.defaultProps = {
  title: "",
  id: "",
};

export default ProfilePlaylistTitle;
