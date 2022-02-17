import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StadisticsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  min-width: 50px;
  padding-right: 1rem;
`;

const SpanText = styled.div`
  margin-left: 0.5em;
  margin-right: 0.5rem;
  display: inline;
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: inline;
  }
`;

const StyledCount = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  text-align: center;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: block;
  }
`;

const ProfileOneStadistics = ({ count, text }) => {
  switch (text) {
    case "Songs":
      return (
        <StadisticsDiv>
          <StyledCount>{count}</StyledCount>
          <SpanText>{text}</SpanText>
        </StadisticsDiv>
      );

    case "Followers":
      return (
        <StadisticsDiv>
          <StyledCount>{count}</StyledCount>
          <SpanText>{text}</SpanText>
        </StadisticsDiv>
      );

    case "Albums":
      return (
        <StadisticsDiv>
          <StyledCount>{count}</StyledCount>
          <SpanText>{text}</SpanText>
        </StadisticsDiv>
      );

    default:
      return "";
  }
};

ProfileOneStadistics.propTypes = {
  count: PropTypes.number,
  text: PropTypes.string,
};

ProfileOneStadistics.defaultProps = {
  count: 0,
  text: "Property",
};

export default ProfileOneStadistics;
