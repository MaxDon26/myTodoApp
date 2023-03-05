import * as React from "react";
import Paper from "@mui/material/Paper";
import { useAuth, useTodos } from "../../store/store";

import { TodoList } from "../ui/TodoList";
import { AddForm } from "../ui/AddForm";
import { Pagination } from "../common/Pagination";
import { paginate } from "../../utils/pagination";
import localStorageService from "../../services/localStorage.service";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function Content() {
  const fetchTodos = useTodos().fetchTodos;
  const userId = localStorageService.getUserId();
  React.useEffect(() => {
    fetchTodos(userId);
  }, []);

  const isAuth = useAuth((state) => state.isAuth);

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
    <>
      {isAuth ? (
        <>
          <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
            <AddForm />
            <TodoList todos={todosCrop} />
          </Paper>
          <Pagination
            values={{ todos, todosCrop, pageCount, setPage, page, count }}
          />
        </>
      ) : (
        <Container maxWidth="sx">
          {" "}
          <Typography color="#000" variant="h3">
            Чтобы начать пользоваться сервисом, необходимо авторизоваться
          </Typography>
        </Container>
      )}
    </>
  );
}
