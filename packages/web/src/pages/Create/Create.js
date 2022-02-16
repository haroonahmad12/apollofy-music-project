import React, { useState } from "react";
import styled from "styled-components";
import Album from "@mui/icons-material/Album";
import MusicNote from "@mui/icons-material/MusicNote";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Container } from "@mui/material";

import withLayout from "../../components/hoc/withLayout";
import TrackCreateForm from "../../components/organisms/forms/TrackForm/TrackCreateForm";
import AlbumCreateForm from "../../components/organisms/forms/AlbumForm/AlbumCreateForm";
import CreatePlaylistForm from "../../components/organisms/forms/CreatePlaylistForm/CreatePlaylistForm";
import Button from "../../components/atoms/buttons/Button";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: 0.5rem;
  border-radius: 1.25rem;
`;

const FormContainer = styled.div`
  margin: 1rem 0 0;
  border: 1px solid ${({ theme }) => theme.colors.background.secondary};
  padding: 1rem 0;
  border-radius: 1.25rem;
`;

function CreatePage() {
  const [form, setForm] = useState("newTrack");

  return (
    <Container as="main" style={{ padding: "0" }}>
      <NavBar>
        <Button
          style={{ backgroundColor: 'transparent', padding: 0 }}
          labelColor={({ theme }) => theme.color.text}
          onClick={() => {
            setForm("newTrack");
          }}
        >
          <MusicNote />
          Add track
        </Button>
        <Button
          style={{ backgroundColor: 'transparent', padding: 0 }}
          labelColor={({ theme }) => theme.color.text}
          onClick={() => {
            setForm("newAlbum");
          }}
        >
          <Album />
          Add album
        </Button>
        <Button
          style={{ backgroundColor: 'transparent', padding: 0 }}
          labelColor={({ theme }) => theme.color.text}
          onClick={() => {
            setForm("newPlaylist");
          }}
        >
          <PlaylistAddIcon />
          Add playlist
        </Button>
      </NavBar>
      <FormContainer>
        {form === "newTrack" && <TrackCreateForm />}
        {form === "newAlbum" && <AlbumCreateForm />}
        {form === "newPlaylist" && <CreatePlaylistForm />}
      </FormContainer>
    </Container>
  );
}

export default withLayout(CreatePage);
