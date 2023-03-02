import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

export const CheckBox = ({ value, ...rest }) => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox {...rest} checked={value} />} />
    </FormGroup>
  );
};
