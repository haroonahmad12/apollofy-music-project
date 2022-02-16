import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import FlexColumn from "../../atoms/layout/FlexColumn";
import HomeSmallText from "../../atoms/body/HomeSmallText";
import defaultAvatar from "../../../images/defaultAvatar.png";

const UserLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  &:hover {
    color: white;
  }
`;

const Layout = styled.div`
  padding-left: 0.3rem;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`;

const SmallGap = styled(FlexColumn)`
  gap: 0;
  align-items: start;
  justify-content: center;
`;

export const Image = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

export default function FriendDetail(props) {
  const { id, profilePicture, username, firstName, lastName } = props;

  return (
    <UserLink to={`/users/${id}`}>
      <Layout>
        <Image alt="Friend's Picture" src={profilePicture || defaultAvatar} />
        <SmallGap>
          <HomeSmallText>{username}</HomeSmallText>
        </SmallGap>
      </Layout>
    </UserLink>
  );
}

FriendDetail.propTypes = {
  profilePicture: PropTypes.string,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.string,
};

FriendDetail.defaultProps = {
  profilePicture: "",
  username: "",
  firstName: "",
  lastName: "",
  id: "",
};
