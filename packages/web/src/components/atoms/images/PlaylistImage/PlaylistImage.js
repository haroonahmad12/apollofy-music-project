import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MainDiv = styled.div`
  margin-left: 1rem;
  width: 100%;
  padding-right: 1rem;
  padding-top: 1rem;
  position: relative;
`;

const PlaylistPic = styled.img`
  height: 200px;
  border-radius: 30px 30px 30px 30px;
  width: 100%;
  object-fit: cover;
  &:hover {
    opacity: 0.7;
  }
`;

const PlaylistImage = ({ imageUrl, alt }) => {
  return (
    <MainDiv md={{ borderRadius: 0, width: "10px" }}>
      <PlaylistPic alt={alt} src={imageUrl} />
    </MainDiv>
  );
};

PlaylistImage.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
};

PlaylistImage.defaultProps = {
  imageUrl:
    "https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk",
  alt: "Untitled",
};

export default PlaylistImage;
