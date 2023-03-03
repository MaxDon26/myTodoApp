import { nanoid } from "nanoid";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import _ from "lodash";

export const useTodos = create(
  devtools((set, get) => ({
    todos: [
      {
        id: nanoid(),
        content: "todo1",
        completed: true,
        created_at: Date.now(),
      },
    ],
    loading: false,
    error: null,
    addTodo(content) {
      if (content !== "") {
        set({ loading: true });
        window.setTimeout(function () {
          set((state) => {
            const newTodo = {
              content,
              id: nanoid(),
              completed: false,
              created_at: Date.now(),
            };
            return {
              ...state,
              loading: false,
              error: null,
              todos: [...state.todos, newTodo],
            };
          });
        }, 2000);
      } else {
        set((state) => ({ ...state, error: "Строка не должна быть пуста" }));
      }
    },
    editTodo(id, content) {
      set({ loading: true });
      const todo = get().todos.find((todo) => todo.id === id);
      if (content === todo.content) return;
      if (content !== "") {
        set((state) => {
          return {
            ...state,
            loading: false,
            error: null,
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, content } : todo
            ),
          };
        });
      } else {
        set((state) => ({
          ...state,
          loading: false,
          error: "Строка не должна быть пуста",
        }));
      }
    },
    getTodos() {
      return _.orderBy(get().todos, "created_at", "desc");
    },
    deleteTodo(id) {
      set({ todos: get().todos.filter((todo) => todo.id !== id) });
    },
    completedTodo(id) {
      set({
        todos: get().todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      });
    },
    removeSelected() {
      set({
        todos: get().todos.filter((todo) => !todo.completed),
      });
    },
  }))
);
