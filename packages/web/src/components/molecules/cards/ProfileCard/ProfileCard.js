import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import * as ROUTES from "../../../../routes";
import { authSelector } from "../../../../store/auth";

const StyledCard = styled(Card)`
  position: relative;
  overflow: hidden;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledIcon = styled(PlayCircleIcon)`
  position: absolute;
  top: 25%;
  left: 40%;
  color: white;
  visibility: hidden;
  transition: 1ms all;
  ${StyledCard}:hover & {
    transition: 1ms all;
    visibility: visible;
  }
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomButton = styled.span`
  background-color: transparent;
  padding: 0 !important;
  &:hover {
    background-color: transparent !important;
  }
`;

const ProfileCard = ({ id, title, date, thumbnails, type, user }) => {
  const navigate = useNavigate();
  const handleEditAlbum = (AlbumId) => {
    const route = `${ROUTES.ALBUM}/update/${AlbumId}`;
    navigate(route);
  };

  const auth = useSelector(authSelector);

  console.log(type, user.id, auth.currentUser.id)

  return (
    <StyledCard
      sx={{
        minWidth: 160,
        height: 250,
        overflow: "hidden",
        margin: 1,
        padding: 1,
        display: "block",
        borderRadius: "1.3rem",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          src={thumbnails}
          alt="album image"
          sx={{ borderRadius: "1.1rem" }}
        />
        <StyledIcon />
        <CardContent>
          <Typography
            variant="body4"
            component="div"
            sx={{
              maxHeight: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary">
            {date.getFullYear()}
            {type === "albums" && user.id === auth.currentUser.id && (
              <CustomButton type="button" onClick={() => handleEditAlbum(id)}>
                <ModeEditIcon
                  sx={{ color: "#b04aff", "&:hover": { color: "purple", cursor: "pointer" } }}
                />
              </CustomButton>
            )}
          </StyledTypography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

ProfileCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.object,
  thumbnails: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  user: PropTypes.string
};

ProfileCard.defaultProps = {
  title: "",
  date: new Date(),
  thumbnails: "",
  type: "",
  id: "",
  user: ""
};

export default ProfileCard;
