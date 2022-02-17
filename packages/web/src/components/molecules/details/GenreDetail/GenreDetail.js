import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import SmallText from "../../../atoms/body/SmallText";

const GenreTitle = styled(SmallText)`
  font-size: 1.2rem;
  width: 100%;
  line-height: 1.5rem;
  color: white;
  text-shadow: 2px 2px black;
  margin: 0;
`;

const GenreLink = styled(Link)`
  text-decoration: none;
  padding: 0 0.5rem 0.5rem;
`;

const GenreLayout = styled.div`
  font-weight: 600;
  cursor: pointer;
  height: 6rem;
  border-radius: 1.25rem;
  padding: 0.5rem;
  text-align: center;
  overflow: hidden;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    opacity:0.8;
  }
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    height: 3.5rem;
  }
`;

const GenreDetail = ({ genre }) => {

  return (
    <GenreLink to={`/genres/${genre?.id}`}>
      <GenreLayout style={{ backgroundImage: `url(${genre?.thumbnails.url_default})` }}>
        <GenreTitle>{genre?.name}</GenreTitle>
      </GenreLayout>
    </GenreLink>
  );
};

GenreDetail.propTypes = {
  genre: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }),
};

GenreDetail.defaultProps = {
  genre: {
    id: null,
    name: null,
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};

export default GenreDetail;
