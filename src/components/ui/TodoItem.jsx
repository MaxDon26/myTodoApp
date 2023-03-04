import React from "react";

import {
  IconButton,
  Input,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckBox } from "../common/form/CheckBox";
import { displayDate } from "../../utils/formatDate";
import { useSnack } from "../../hooks/useSnack";

export const TodoItem = ({
  completed,
  content,
  created_at,
  _id,
  completedTodo,
  deleteTodo,
  editTodo,
}) => {
  const [edit, setEdit] = React.useState(false);
  const [text, setText] = React.useState(content);
  const { handleOpen } = useSnack();
  const handleEdit = (id) => {
    setEdit((prev) => !prev);
    editTodo(id, text);
    handleOpen({ open: true, text: "Todo was updated" });
  };

  return (
    <ListItem sx={{ justifyContent: "space-between" }} divider>
      <CheckBox value={completed} onChange={() => completedTodo(_id)} />
      <Input
        value={text}
        disabled={!edit}
        onChange={(e) => {
          setText(e.target.value);
        }}
        sx={{ flexGrow: 2 }}
        variant="standard"
      />
      <Typography variant="standard" mx={3}>
        {displayDate(created_at)}
      </Typography>
      <>
        {!edit ? (
          <IconButton
            onClick={() => setEdit(true)}
            color="primary"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => handleEdit(_id)}
            color="success"
            aria-label="edit"
          >
            <TaskAltIcon />
          </IconButton>
        )}
      </>
      <IconButton
        onClick={() => deleteTodo(_id)}
        color="error"
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
