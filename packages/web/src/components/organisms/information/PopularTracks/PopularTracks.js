import React, { useState } from "react";
import styled from "styled-components";

import { useFetchTracks } from "../../../../hooks/useTracks";
import TrackDetail from "../../../molecules/details/TrackDetail";
import SmallText from "../../../atoms/body/SmallText";

export const SectionLayout = styled.div`
  margin-top: 1.45rem;
  padding-right: 0.75rem;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: ${({ theme }) => theme.media.desktop}) {
   padding-right: 0;
  }
`;

export const TracksList = styled(SectionLayout)`
  margin-top: 0;
  
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1.25rem;
  padding: 1rem;
  width: 100%;
  gap: 1rem;
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-top: 1rem;
    width: 100%;
  }
`;

export const TracksText = styled(SmallText)`
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    margin: auto;
  }
`;

function PopularTracks() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [page, setPage] = useState(1);

  const { data: tracks, isError, error, isLoading } = useFetchTracks({ page, sort: "num_plays" });

  const handlePlayButton = (track) => {
    setSelectedTrack(track);
  };

  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error}</p>
      </>
    );

  return (
    <SectionLayout>
      <TracksText>Popular Tracks</TracksText>
      <TracksList>
        {tracks?.data?.data?.map((track) => (
          <TrackDetail key={track.id} track={track} handlePlayButton={handlePlayButton} />
        ))}
      </TracksList>
    </SectionLayout>
  );
}

export default PopularTracks;
