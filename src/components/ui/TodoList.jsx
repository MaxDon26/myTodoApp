import { List } from "@mui/material";
import { TodoItem } from "./TodoItem";
import { useTodos } from "../../store/store";
import React from "react";
import { Skeleton } from "../common/Skeleton";

export const TodoList = ({ todos }) => {
  const editTodo = useTodos((state) => state.editTodo);
  const deleteTodo = useTodos((state) => state.deleteTodo);
  const completedTodo = useTodos((state) => state.completedTodo);
  const loading = useTodos((state) => state.loading);

  return (
    <List style={{ paddingBottom: 0 }}>
      {loading && <Skeleton />}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          completedTodo={completedTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </List>
  );
};
