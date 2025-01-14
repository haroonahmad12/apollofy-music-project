import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProfileImage from "../../../atoms/images/ProfileImage";
import ProfileUserDescription from "../../../atoms/body/ProfileUserDescription";
import ProfileStadistics from "../../../molecules/buttons/ProfileStadistics";
import ProfileUserTitle from "../../../atoms/body/ProfileUserTitle";

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text};
  justify-content: center;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: flex;
    align-items: center;
    margin: auto;
  }
`;

const AvatarDiv = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    align-items: center;
    justify-content: center;
    border-radius: 100%;
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
