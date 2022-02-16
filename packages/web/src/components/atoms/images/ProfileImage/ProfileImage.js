import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  margin-left: 1rem;
  width: 100%;
  padding-right: 1rem;
  padding-top: 1rem;
  position: relative;
`;

const ImageProfile = styled.img`
  height: 200px;
  border-radius: 30px 30px 30px 30px;
  width: 100%;
  object-fit: cover;
  &:hover {
    opacity: 0.7;
  }
   @media only screen and (max-width: ${({ theme }) => theme.media.phablet}) {
    height: 10rem;
    
  }
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    height: 10rem;
    
  } 
`;

const ProfileImage = ({ image }) => {
  return (
    <MainDiv>
      <ImageProfile alt="profile image" src={image || "https://avalos.sv/wp-content/uploads/default-featured-image.png"} />
    </MainDiv>
  );
};

ProfileImage.propTypes = {
  image: PropTypes.string,
};

ProfileImage.defaultProps = {
  image: "",
};
export default ProfileImage;
