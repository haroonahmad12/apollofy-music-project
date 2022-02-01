import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

import { FlexColumn } from "../../../atoms/FlexColumn/FlexColumn";
import { MiddleTitle } from "../../../atoms/MiddleTitle/MiddleTitle";
import { SmallText } from "../../../atoms/SmallText/SmallText";
import { PrimaryButton } from "../../../atoms/buttons/PrimaryButton";

import { setProfilePicture } from "../../../../redux/auth";
import { modalSelector, nextModal } from "../../../../redux/modal";

const Input = styled("input")({
  display: "none",
});

export default function ProfilePictureForm() {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const { currentModal } = useSelector(modalSelector);

  function handlePicture() {
    if (value) dispatch(setProfilePicture(value));

    dispatch(nextModal(currentModal + 1));
  }

  return (
    <FlexColumn>
      <MiddleTitle>Pick a Profile Picture</MiddleTitle>
      <SmallText>
        Do you have a favourite selfie? Otherwise, you can take it right now!
      </SmallText>
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            {/* <PhotoCamera /> */}
          </IconButton>
        </label>
        {value ? <p>{value}</p> : null}
      </Stack>
      <PrimaryButton onClick={() => handlePicture()}>
        {value ? "Submit" : "Skip for now"}
      </PrimaryButton>
    </FlexColumn>
  );
}