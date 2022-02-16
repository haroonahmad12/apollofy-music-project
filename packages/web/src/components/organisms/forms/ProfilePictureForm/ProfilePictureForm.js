import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import Stack from "@mui/material/Stack";
import { FormHelperText, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { pictureLinkAdded } from "../../../../store/auth";
import { modalSelector, nextModal } from "../../../../store/modal";
import { uploadResource } from "../../../../api/api-cloudinary";
import FlexColumn from "../../../atoms/layout/FlexColumn";
import MiddleTitle from "../../../atoms/headings/MiddleTitle";
import SmallText from "../../../atoms/body/SmallText";
import ButtonLoginModal from "../../../atoms/buttons/ButtonLoginModal";

const allowedImageExt = ["jpg", "jpeg", "png"];

function ProfilePictureForm() {
  const [imageUrl, setimageUrl] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { currentModal } = useSelector(modalSelector);

  function handlePicture() {
    dispatch(nextModal(currentModal + 1));
    dispatch(pictureLinkAdded(imageUrl));
  }

  return (
    <FlexColumn>
      <MiddleTitle>Pick a Profile Picture</MiddleTitle>
      <SmallText>Do you have a favourite selfie? Otherwise, take one right now!</SmallText>
      <Stack direction="column" alignItems="center" spacing={2}>
        <FileUploader
          handleChange={(file) => {
            uploadResource(file, "image")
              .then((res) => {
                setimageUrl(res.data.url);
              })
              .catch((err) => {
                setError(err.message);
              });
          }}
          name="input_album_cover"
          types={allowedImageExt}
        />
        {error && <FormHelperText style={{ color: "#d32f2f" }}>{error}</FormHelperText>}
        {imageUrl && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "rgba(0, 0, 0, 0.6)", mb: 1 }}>
              Profile image preview
            </Typography>
            <img
              style={{
                width: "10rem",
                marginBottom: "1rem",
                aspectRatio: "4/3",
                objectFit: "contain",
                objectPosition: "center",
                borderRadius: "0.25rem",
                boxShadow: "0 0 0.25rem rgba(0, 0, 0, 0.5)",
              }}
              src={imageUrl}
              alt="preview"
            />
          </Box>
        )}
      </Stack>
      <ButtonLoginModal variant="login" btnColor="#B04AFF" onClick={() => handlePicture()}>
        {imageUrl ? "Submit" : "Skip for now"}
      </ButtonLoginModal>
    </FlexColumn>
  );
}

export default ProfilePictureForm;
