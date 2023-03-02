import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import { useTodos } from "../../store/store";
import { useSnack } from "../../hooks/useSnack";

export const AddForm = () => {
  const addTodo = useTodos((state) => state.addTodo);
  const removeSelected = useTodos((state) => state.removeSelected);
  const { handleOpen } = useSnack();
  const handleAdd = (curr) => {
    addTodo(curr.value);
    if (curr.value !== "") handleOpen({ open: true, text: "Todo was created" });
    curr.value = "";
  };
  const input = React.useRef();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SearchIcon color="inherit" sx={{ display: "block" }} />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="write the task in this field"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "default" },
              }}
              variant="standard"
              inputRef={input}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={() => handleAdd(input.current)}
            >
              Add todo
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mr: 1 }}
              onClick={() => removeSelected()}
            >
              Remove selected
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
