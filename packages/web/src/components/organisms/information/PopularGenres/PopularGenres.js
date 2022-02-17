import React from "react";
import styled from "styled-components";

import { useFetchGenres } from "../../../../hooks/useGenres";
import GenreDetail from "../../../molecules/details/GenreDetail";
import SmallText from "../../../atoms/body/SmallText";

const SectionLayout = styled.div`
  margin-top: 1.45rem;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
   padding-right: 0;
  }
`;

const GenresList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-left: 0.25rem;
  margin: 0 -0.5rem;
  @media only screen and (max-width: ${({ theme }) => theme.media.desktop}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const GenresText = styled(SmallText)`
  padding-left: 0.25rem;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    padding-left: 0;
  }
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    margin: auto;
  }
`;

export default function PopularGenres() {
  const { data: genres } = useFetchGenres();
  return (
    <SectionLayout>
      <GenresText>Genres</GenresText>
      <GenresList>
        {genres?.data?.data?.map((genre) => (
          <GenreDetail key={genre.id} genre={genre} />
        ))}
      </GenresList>
    </SectionLayout>
  );
}
