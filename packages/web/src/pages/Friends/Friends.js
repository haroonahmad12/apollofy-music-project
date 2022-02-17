import React from "react";
import styled from "styled-components";
import HomeSmallText from "../../components/atoms/body/HomeSmallText";
import Button from "../../components/atoms/buttons/Button";
import withLayout from "../../components/hoc/withLayout";
import FriendDetail from "../../components/molecules/details/FriendDetail";
import AddFriendsModal from "../../components/organisms/modals/AddFriendsModal";
import { useFollowedUsers } from "../../hooks/useUsers";

const FriendsDiv = styled.div`
  flex-direction: column;
  display: block;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: block;
  }
  padding: 1rem;
`;

function FriendsPage() {
  const followedUsers = true;
  const { data: users, isSuccess } = useFollowedUsers(followedUsers);
  const friendsList = users?.data?.data;
  return (
    <main>
      <section>
        <FriendsDiv>
          <h5>This Page is still under construction but here are your friends anyways</h5>
          {friendsList?.map((friend) => (
            <FriendDetail
              key={friend.id}
              id={friend.id}
              profilePicture={friend.thumbnails?.url_default}
              username={friend.username}
              firstName={friend.firstname}
              lastName={friend.lastname}
            />
          ))}
          {friendsList?.length === 0 && (
            <HomeSmallText>No Friends yet? Add more People</HomeSmallText>
          )}
        </FriendsDiv>

        {/* <Button onClick={handleModal} btnColor="#B04AFF" type="block">
          Add Friends
        </Button>
        <AddFriendsModal isOpen={isOpen} handleModal={handleModal} /> */}
      </section>
    </main>
  );
}

export default withLayout(FriendsPage);
