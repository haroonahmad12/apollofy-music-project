import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import { authSelector } from "../../../../store/auth";
import ButtonFollowUser from "../../buttons/ButtonFollowUser";

const StyledTitleUser = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ProfileUserTitle = ({ title, id }) => {
  const { currentUser } = useSelector(authSelector);
  const { profileId } = useParams();

  return (
    <StyledTitleUser>
      <div>
        <Typography variant="h5">{title}</Typography>
      </div>
      {currentUser.id !== profileId && (
        <div>
          <ButtonFollowUser id={id} />
        </div>
      )}
    </StyledTitleUser>
  );
};

ProfileUserTitle.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProfileUserTitle;
