import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import GroupsIcon from "@mui/icons-material/Groups";

import ScoreSVG from "../../../../assets/score.svg";
import HomeSVG from "../../../../assets/home.svg";
import StatsSVG from "../../../../assets/bar_chart.svg";
import Toggle from "../../../atoms/toggles/Switch";

const Bar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    flex-direction: row;
    position: fixed;
    bottom: 0;
    border: 1px solid ${({ theme }) => theme.colors.border};
    width: 100vw;
    justify-content: space-between;
    padding: 1rem 3rem;
    margin: 0;
    background-color: ${({ theme }) => theme.colors.background.primary};
    z-index: 1;
  }
`;

const NavSVG = styled(SVG)`
  width: 2rem;
  height: 2rem;
  .icon-color {
    fill: ${({ theme }) => theme.colors.text};
  }
`;

const SelectedNavSVG = styled(SVG)`
  width: 2rem;
  height: 2rem;
  .icon-color {
    fill: ${({ theme }) => theme.colors.label};
  }
`;
const ToggleContainer = styled.div`
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
display: none;  
`;
const FriendsIcon = styled(Link)`
display:none;
color: ${({ theme }) => theme.colors.label};
@media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
  display: block;  
   
  `;
const FriendsIconSelected = styled(Link)`
  display:none;
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: block;  
   
`;

export default function ControlBar() {
  const { pathname } = useLocation();

  return (
    <Bar>
      <Link to="/">
        {pathname === "/" ? <SelectedNavSVG src={HomeSVG} /> : <NavSVG src={HomeSVG} />}
      </Link>
      <Link to="/create">
        {pathname === "/create" ? <SelectedNavSVG src={ScoreSVG} /> : <NavSVG src={ScoreSVG} />}
      </Link>
      <Link to="/stats">
        {pathname === "/stats" ? <SelectedNavSVG src={StatsSVG} /> : <NavSVG src={StatsSVG} />}
      </Link>
      <ToggleContainer>
        <Toggle />
      </ToggleContainer>
      {pathname === "/friends" ? (
        <FriendsIcon to="/friends">
          <GroupsIcon fontSize="large" />
        </FriendsIcon>
      ) : (
        <FriendsIconSelected to="/friends">
          <GroupsIcon fontSize="large" />
        </FriendsIconSelected>
      )}
    </Bar>
  );
}
