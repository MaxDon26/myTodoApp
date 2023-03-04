import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSnack } from "../../hooks/useSnack";

export const SnackBar = () => {
  const { open, handleOpen, text, severity } = useSnack();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    handleOpen({ open: false });
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
};
