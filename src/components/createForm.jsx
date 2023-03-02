import { Button, TextField } from "@mui/material";
import React from "react";

const CreateForm = () => {
  return (
    <form>
      <TextField
        id="outlined-basic"
        label="Введите задачу"
        variant="outlined"
      />
      <Button variant="contained">Добавить</Button>
    </form>
  );
};

export default CreateForm;
