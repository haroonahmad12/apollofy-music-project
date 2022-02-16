import React from "react";
import { useParams } from "react-router-dom";

import withLayout from "../../components/hoc/withLayout";
import Tracks from "../../components/organisms/information/Tracks";
import PlaylistImage from "../../components/atoms/images/PlaylistImage/PlaylistImage";

import { useFetchGenre } from "../../hooks/useGenres";
import { useInfiniteTracks } from "../../hooks/useTracks";
import SearchBar from "../../components/molecules/input-controls/SearchBar";
import {
  DescriptionDiv,
  MainText,
  PageLayout,
  PictureDiv,
} from "../Playlists/Playlists";
import ProfileUserTitle from "../../components/atoms/body/ProfileUserTitle";

function GenresPage() {
  const { genreId } = useParams();
  const { data: genre } = useFetchGenre(genreId);
  const genreData = genre?.data?.data;

  const params = { genreId: genreId }
  const { data: tracks } = useInfiniteTracks(params);
  const tracksData = tracks?.data?.data;

  return (
    <>
      <SearchBar />
      <PageLayout>
        <PictureDiv>
          <PlaylistImage
            imageUrl={genreData?.thumbnails?.url_default}
            alt={genreData?.name}
          />
        </PictureDiv>
        <DescriptionDiv>
          <ProfileUserTitle title={genreData?.name} id={genreData?.id} />
        </DescriptionDiv>
      </PageLayout>
      <MainText>Tracks</MainText>
      <Tracks tracks={tracksData} />
    </>
  );
}

export default withLayout(GenresPage);
