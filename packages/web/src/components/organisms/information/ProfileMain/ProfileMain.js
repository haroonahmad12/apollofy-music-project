import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProfileImage from "../../../atoms/images/ProfileImage";
import ProfileUserDescription from "../../../atoms/body/ProfileUserDescription";
import ProfileStadistics from "../../../molecules/ProfileStadistics";
import ProfileUserTitle from "../../../atoms/body/ProfileUserTitle";

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1.3rem;
  background: #eeeee4;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  justify-content: center;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: flex;
    align-items: center;
    margin: auto;
  }
`;

const AvatarDiv = styled.div`
  display: flex;
  min-width: 215px;
  width: 100%;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    align-items: center;
    justify-content: center;
    max-width: 5rem;
    border-radius: 100%;
    margin-top: 3rem;
    padding: 1rem;
  }
`;

const DescriptionDiv = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ProfileMain = ({ user, albums, tracks }) => {
  console.log(user);
  return (
    <ProfileContent>
      <AvatarDiv>
        <ProfileImage image={user?.thumbnails?.url_default} />
      </AvatarDiv>
      <DescriptionDiv>
        <ProfileUserTitle title={user?.username} id={user?.id} />
        <ProfileStadistics tracks={tracks} followers={user?.num_followers} albums={albums} />
        <ProfileUserDescription description={user?.description} />
      </DescriptionDiv>
    </ProfileContent>
  );
};

ProfileMain.propTypes = {
  user: PropTypes.object,
  albums: PropTypes.number,
  tracks: PropTypes.number,
};

ProfileMain.defaultProps = {
  user: {},
  albums: 0,
  tracks: 0,
};

export default ProfileMain;