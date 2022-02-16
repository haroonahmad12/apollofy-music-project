import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import SmallText from "../../atoms/body/SmallText";

const GenreTitle = styled(SmallText)`
  margin-top: auto;
  font-size: 1.5rem;
  width: 100%;
  line-height: 3rem;
  color: white;
  letter-spacing: 5px;
  text-shadow: 2px 2px black;

  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 2rem;
  }
 
`;

const GenreLink = styled(Link)`
  text-decoration: none;
`;

const GenreDetail = ({ genre }) => {
  const GenreLayout = styled.div`
    font-weight: 600;
    cursor: pointer;
    height: 6rem;
    border-radius: 1.25rem;
    padding: 0.3rem;
    display: flex;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-align: center;
    overflow: hidden;
    background-size: cover;
    background-image: url(${genre.thumbnails.url_default});

     &:hover{
    opacity:0.8;
  }

    @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
      height: 3.5rem;
    }
  `;

  return (
    <GenreLink to={`/genres/${genre.id}`}>
      <GenreLayout>
        <GenreTitle>{genre.name}</GenreTitle>
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
  },
};

export default GenreDetail;
