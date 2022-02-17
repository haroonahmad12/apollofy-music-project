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
import { useSelector } from "react-redux";
import { themeSelector } from "../../store/theme";
import makeTheme from "../../styles/audioPlayerTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.background.secondary};
  padding: 0.5rem;
  border-radius: 1.25rem;
`;

const FormContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.background.secondary};
  padding: 1rem 0;
  border-radius: 1.25rem;
`;

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 1.45rem;
`;

function CreatePage() {
  const [form, setForm] = useState("newTrack");

  const { theme } = useSelector(themeSelector);

  const mode = makeTheme(theme);

  return (
    <ThemeProvider theme={mode}>
      <MainContainer as="main">
        <NavBar>
          <Button
            style={{
              backgroundColor: "transparent",
              padding: 0,
              color: theme === "light" ? "black" : "white",
            }}
            onClick={() => {
              setForm("newTrack");
            }}
          >
            <MusicNote />
            Add track
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              padding: 0,
              color: theme === "light" ? "black" : "white",
            }}
            onClick={() => {
              setForm("newAlbum");
            }}
          >
            <Album />
            Add album
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              padding: 0,
              color: theme === "light" ? "black" : "white",
            }}
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
      </MainContainer>
    </ThemeProvider>
  );
}

export default withLayout(CreatePage);
