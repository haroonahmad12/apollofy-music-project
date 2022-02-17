import * as React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import styled from "styled-components";

import { auth, getCurrentUserToken } from "../../../../services/auth";
import usersApi from "../../../../api/api-users";
import { currentUserAdded } from "../../../../store/auth";

const TextField = styled.input`
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  background-clip: paddIng-box;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: border-color 0.15s ease-In-out, box-shadow 0.15s ease-In-out;
`;

export default function UpdateProfileModal({ modalType, openProfileModal, handleClose }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [update, setUpdate] = React.useState(null);
  const [fileLoading, setFileLoading] = React.useState(false);

  const setTargetValue = (target) => {
    if (modalType === "email") {
      setUpdate({ email: target.value });
    }
    if (modalType === "username") {
      setUpdate({ username: target.value });
    }
    if (modalType === "birthday") {
      setUpdate({ birth_date: target.value });
    }
    if (modalType === "description") {
      setUpdate({ description: target.value });
    }
  };

  const sendUpdate = async () => {
    if (modalType === "password") {
      await auth.sendPasswordResetEmail(auth.currentUser.email);
      return;
    }

    const userToken = await getCurrentUserToken();

    if (userToken) {
      const res = await usersApi.updateUser(userToken, update);

      if (res) {
        dispatch(currentUserAdded(res.data.data));
        handleClose();
      }
    }
  };

  async function uploadImage(files) {
    const formData = new FormData();
    setFileLoading(true);

    formData.append("file", files[0]);
    formData.append("upload_preset", "crm5jzoc");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/stringifiers/image/upload",
      formData,
    );

    if (res) {
      setFileLoading(false);
      setUpdate({ thumbnails: { url_default: res?.data?.secure_url } });
    }
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openProfileModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {(modalType === "email" && "Please Enter Your new Email Address") ||
            (modalType === "password" && "Please Enter Your new Password") ||
            (modalType === "username" && "Please Enter Your new Username") ||
            (modalType === "birthday" && "Please Enter Your new Birthday") ||
            (modalType === "profilePic" && "Select your new profile picture") ||
            (modalType === "description" && "Please Update your description")}
        </DialogTitle>
        <TextField
          type={
            (modalType === "email" && "email") ||
            (modalType === "password" && "password") ||
            (modalType === "username" && "text") ||
            (modalType === "birthday" && "date") ||
            (modalType === "profilePic" && "file") ||
            (modalType === "description" && "text")
          }
          placeholder={
            (modalType === "email" && "email@mail.com") ||
            (modalType === "password" && "Click on Agree to send a password reset link") ||
            (modalType === "username" && "new username") ||
            (modalType === "birthday" && "change your birthday") ||
            (modalType === "description" && "change your description")
          }
          onChange={(e) =>
            modalType === "profilePic" ? uploadImage(e.target.files) : setTargetValue(e.target)
          }
          disabled={modalType === "password" && true}
        />
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={sendUpdate}
            autoFocus
            disabled={fileLoading && true}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

UpdateProfileModal.propTypes = {
  openProfileModal: PropTypes.bool,
  modalType: PropTypes.string,
  handleClose: PropTypes.func,
};

UpdateProfileModal.defaultProps = {
  openProfileModal: false,
  handleClose: null,
  modalType: null,
};
