import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GroupsIcon from "@mui/icons-material/Groups";
import AlbumIcon from "@mui/icons-material/Album";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Container } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useFetchAlbums } from "../../hooks/useAlbums";
import { useFetchUsers } from "../../hooks/useUsers";
import { useFetchPlaylists } from "../../hooks/usePlaylists";
import { useFetchTracks } from "../../hooks/useTracks";
import withLayout from "../../components/hoc/withLayout";

import { useSelector } from "react-redux";
import { themeSelector } from "../../store/theme";
import Button from "../../components/atoms/buttons/Button";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.background.secondary};
  padding: 0.5rem;
  border-radius: 1.25rem;
`;

const ChartBody = styled.div`
  margin-top: 1.45rem;
  width: 100%;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
`;

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 1.45rem;
`;

const Statistics = () => {
  const [chartTitle, setChartTitle] = useState("Most Popular Users");
  const [chartUnit, setChartUnit] = useState("Followers");
  const [chartColor, setChartColor] = useState("#0770f7b0");

  const [statsArray, setArray] = useState([]);
  const [likes, setLikes] = useState([]);
  const { theme } = useSelector(themeSelector);

  const { data: albums } = useFetchAlbums({ sort: "num_likes" });
  const albumsList = albums?.data?.data;

  const { data: playlists } = useFetchPlaylists({ sort: "num_followers" });
  const playlistsList = playlists?.data?.data;

  const { data: users } = useFetchUsers({ sort: "num_followers" });
  const usersList = users?.data?.data;

  const { data: tracks } = useFetchTracks({ sort: "num_plays" });
  const tracksList = tracks?.data?.data;

  function limit(string = "", max = 0) {
    return string.substring(0, max);
  }

  const createArray = (array) => {
    setArray([]);
    setLikes([]);
    if (array) {
      array.forEach((title) => {
        setArray((list) => [...list, limit(title?.title, 10) || limit(title?.username, 10)]);
        setLikes((list) => [...list, title?.num_plays || title.num_followers || title?.num_likes]);
      });
    }
  };

  useEffect(() => {
    createArray(usersList);
  }, []);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };
  const labels = statsArray; // Name of 10 most popular users playlists or albums

  const data = {
    labels,
    datasets: [
      {
        label: chartUnit,
        data: likes, // This is the array of number of followers or views
        backgroundColor: chartColor,
      },
    ],
  };
  return (
    <MainContainer as="main">
      <NavBar>
        <Button
          style={{
            backgroundColor: "transparent",
            padding: 0,
            color: theme === "light" ? "black" : "white",
          }}
          onClick={() => {
            setChartTitle("Most Popular Users");
            setChartUnit("Followers");
            setChartColor("#0770f7b0");
            createArray(usersList);
          }}
        >
          <GroupsIcon />
          Users
        </Button>

        <Button
          type="button"
          style={{
            backgroundColor: "transparent",
            padding: 0,
            color: theme === "light" ? "black" : "white",
          }}
          onClick={() => {
            setChartTitle("Most Popular Songs");
            setChartUnit("Times Played");
            setChartColor("#6900ffc7");
            createArray(tracksList);
          }}
        >
          <MusicNoteIcon />
          Songs
        </Button>

        <Button
          type="button"
          style={{
            backgroundColor: "transparent",
            padding: 0,
            color: theme === "light" ? "black" : "white",
          }}
          onClick={() => {
            setChartTitle("Most Liked Albums");
            setChartUnit("Likes");
            setChartColor("#fffb00b5");
            createArray(albumsList);
          }}
        >
          <AlbumIcon />
          Albums
        </Button>

        <Button
          type="button"
          style={{
            backgroundColor: "transparent",
            padding: 0,
            color: theme === "light" ? "black" : "white",
          }}
          onClick={() => {
            setChartTitle("Most Popular Playlists");
            setChartUnit("Followers");
            setChartColor("#00e106b3");
            createArray(playlistsList);
          }}
        >
          <LibraryMusicIcon />
          Playlists
        </Button>
      </NavBar>
      {statsArray && (
        <ChartBody>
          <Bar options={options} data={data} style={{ minHeight: "15rem" }} />
        </ChartBody>
      )}
    </MainContainer>
  );
};

export default withLayout(Statistics);
