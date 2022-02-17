import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { authSelector } from "../../../../store/auth";
import ButtonFollowUser from "../../buttons/ButtonFollowUser";

const ProfileUserTitle = ({ title, id }) => {
  const { currentUser } = useSelector(authSelector);
  const { profileId } = useParams();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        pb: 2
      }}
    >
      <Typography variant="h5">{title}</Typography>
      {currentUser.id !== profileId && (
        <div>
          <ButtonFollowUser id={id} />
        </div>
      )}
    </Box>
  );
};

ProfileUserTitle.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProfileUserTitle;
