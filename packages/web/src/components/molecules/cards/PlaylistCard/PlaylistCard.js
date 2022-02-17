import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import HomeSmallText from "../../../atoms/body/HomeSmallText";
import FlexColumn from "../../../atoms/layout/FlexColumn";

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: white;
  }
`;

const CardLayout = styled(FlexColumn)`
  justify-content: space-between;
  min-height: 90%;
`;

const StyledPlaylistTitle = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  mix-blend-mode: difference;
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 1rem;
  }
`;

const Card = styled.div`
  font-weight: 600;
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 1.25rem;
  height: 15rem;
  max-width: 15rem;
  transition: 1s;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props?.thumbnails?.url_default});
`;

function PlaylistCard(props) {
  const { playlist } = props;

  return (
    <CardLink to={`/playlists/${playlist.id}`}>
      <Card thumbnails={playlist.thumbnails}>
        <HomeSmallText>{playlist.num_tracks} Tracks</HomeSmallText>
        <CardLayout>
          <StyledPlaylistTitle>{playlist.title}</StyledPlaylistTitle>
          <HomeSmallText>{playlist.num_followers} listeners</HomeSmallText>
        </CardLayout>
      </Card>
    </CardLink>
  );
}

export default PlaylistCard;

PlaylistCard.propTypes = {
  playlist: PropTypes.exact({
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string,
    tracks: PropTypes.arrayOf(PropTypes.object),
    num_tracks: PropTypes.number.isRequired,
    num_followers: PropTypes.number.isRequired,
    followed_by: PropTypes.arrayOf(PropTypes.object),
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

PlaylistCard.defaultProps = {
  playlist: {
    id: null,
    user: {},
    title: null,
    description: null,
    color: null,
    tracks: [],
    num_tracks: null,
    num_followers: null,
    followed_by: [],
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};
