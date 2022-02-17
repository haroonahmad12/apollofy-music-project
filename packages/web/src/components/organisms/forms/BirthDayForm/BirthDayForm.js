import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import { Box } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";

import FlexColumn from "../../../atoms/layout/FlexColumn";
import MiddleTitle from "../../../atoms/headings/MiddleTitle";
import DateOfBirthSchema from "../../../../schemas/DateOfBirthSchema";
import { dateOfBirthAdded } from "../../../../store/auth";
import { modalSelector, nextModal } from "../../../../store/modal";
import ButtonLoginModal from "../../../atoms/buttons/ButtonLoginModal/ButtonLoginModal";

const dateSchema = {
  date: null, // if date is defiend as '' yup will throw a invalid date error
};

export default function BirthDayForm() {
  const dispatch = useDispatch();
  const { currentModal } = useSelector(modalSelector);

  return (
    <Formik
      initialValues={dateSchema}
      validationSchema={DateOfBirthSchema}
      onSubmit={(values) => {
        if (values.date) dispatch(dateOfBirthAdded(values.date.toISOString().substring(0, 10)));
        dispatch(nextModal(currentModal + 1));
      }}
      render={(props) => (
        <Form>
          <FlexColumn>
            <MiddleTitle>Create your account</MiddleTitle>
            <Box width="100%" mb={2} sx={{ alignItems: "center" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  {isMobile ? (
                    <MobileDatePicker
                      label="Select a date"
                      value={props.values.date}
                      onChange={(value) => props.setFieldValue("date", value)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  ) : (
                    <DesktopDatePicker
                      label="Select a date"
                      value={props.values.date}
                      minDate={new Date("1930-01-01")}
                      maxDate={new Date("2017-01-01")}
                      onChange={(value) => props.setFieldValue("date", value)}
                      renderInput={(params) => (
                        <TextField
                          sx={{
                            border: "1px solid lightgray",
                            borderRadius: "0.3rem",
                            backgroundColor: "white",
                            color: "lightgray",
                          }}
                          {...params}
                        />
                      )}
                    />
                  )}
                </Stack>
              </LocalizationProvider>
              <ErrorMessage className="errorMessage" name="date" component="div" />
            </Box>
            <ButtonLoginModal btnColor="#B04AFF" variant="login" BtnColor="black">
              Submit
            </ButtonLoginModal>
          </FlexColumn>
        </Form>
      )}
    />
  );
}

BirthDayForm.propTypes = {
  values: PropTypes.element,
  setFieldValue: PropTypes.object,
};

BirthDayForm.defaultProps = {
  values: null,
  setFieldValue: {},
};
