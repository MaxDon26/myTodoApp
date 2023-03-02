import * as React from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { useTodos } from "../../store/store";

import { TodoList } from "../ui/TodoList";
import { AddForm } from "../ui/AddForm";
import { SnackBar } from "../ui/SnackBar";
import { Pagination } from "../common/Pagination";
import { paginate } from "../../utils/pagination";

export default function Content() {
  const todos = useTodos().getTodos();
  const [page, setPage] = React.useState(1);
  const todosCrop = paginate(todos, page, 10);
  const count = todos.length;
  const pageCount = Math.ceil(count / 10);

  React.useEffect(() => {
    if (count) {
      if (todosCrop.length === 0) {
        setPage((prev) => prev - 1);
      }
    }
  }, [todosCrop]);

  return (
    <Box height="100vh" component="main" sx={{ bgcolor: "#eaeff1", py: 5 }}>
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <AddForm />
        <TodoList todos={todosCrop} />
      </Paper>
      <Pagination
        values={{ todos, todosCrop, pageCount, setPage, page, count }}
      />
      <SnackBar />
    </Box>
  );
}
