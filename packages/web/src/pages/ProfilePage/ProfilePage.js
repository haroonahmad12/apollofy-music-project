import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import usersApi from "../../api/api-users";

import ButtonPlaySuffle from "../../components/atoms/ButtonPlayShuffle/ButtonPlayShuffle";
import withLayout from "../../components/hoc/withLayout";
import ProfileGroupButtons from "../../components/molecules/ProfileGroupButtons/ProfileGroupButtons";
import ProfileMain from "../../components/organisms/information/ProfileMain";
import ProfileUserCards from "../../components/organisms/information/ProfileUserCards";
import ProfileUserTracks from "../../components/organisms/information/ProfileUserTracks";

import { useUserAlbums } from "../../hooks/useAlbums";
import { useUserPlaylists } from "../../hooks/usePlaylists";
import { useUserTracks } from "../../hooks/useTracks";

const StyledProfilePage = styled.div`
  overflow: hidden;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
  }
`;

const StyledMostListened = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  letter-spacing: 4px;
  font-style: oblique;
  font-variant: small-caps;
`;

const StyledAlbums = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  letter-spacing: 4px;
  font-style: oblique;
  font-variant: small-caps;
`;
const StyledPlaylists = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  letter-spacing: 4px;
  font-style: oblique;
  font-variant: small-caps;
`;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { profileId } = useParams();

  const { data: albums } = useUserAlbums(undefined, undefined, undefined, undefined, profileId);
  const { data: playlists } = useUserPlaylists(profileId);
  const { data: tracks } = useUserTracks(1, undefined, 5, "num_plays", "desc", profileId);

  useEffect(() => {
    (async () => {
      const { data } = usersApi.getUser(profileId);
      setUser(data.data);
    })();
  }, [profileId]);

  return (
    <StyledProfilePage>
      <ProfileGroupButtons />
      <ProfileMain user={user} albums={albums?.data?.length} tracks={tracks?.data?.data.length} />
      <ButtonPlaySuffle />
      <StyledMostListened>Most Listened</StyledMostListened>
      <ProfileUserTracks />
      <StyledAlbums>Albums</StyledAlbums>
      <ProfileUserCards data={albums?.data?.data} />
      <StyledPlaylists>Playlists</StyledPlaylists>
      <ProfileUserCards data={playlists?.data?.data} />
    </StyledProfilePage>
  );
};

export default withLayout(ProfilePage);
