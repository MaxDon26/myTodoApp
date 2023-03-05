import { nanoid } from "nanoid";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import _ from "lodash";
import todosService from "../services/todos.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";

export const useTodos = create(
  devtools((set, get) => ({
    todos: [],
    loading: false,
    error: null,
    async fetchTodos(uid) {
      set({ loading: true });
      const { content } = await todosService.fetchAll(uid);
      set({ loading: false, todos: content });
    },
    async addTodo(payload) {
      if (payload !== "") {
        set({ loading: true });
        try {
          const newTodo = {
            content: payload,
            _id: nanoid(),
            completed: false,
            created_at: Date.now(),
            userId: localStorageService.getUserId(),
          };
          const { content } = await todosService.create(newTodo);

          set((state) => {
            return {
              ...state,
              loading: false,
              error: null,
              todos: [...state.todos, content],
            };
          });
        } catch (error) {}
      } else {
        set((state) => ({ ...state, error: "Строка не должна быть пуста" }));
      }
    },
    async editTodo(id, content) {
      set({ loading: true });
      const todo = get().todos.find((todo) => todo._id === id);
      if (content === todo.content) return;
      if (content !== "") {
        try {
          await todosService.edit({ _id: id, content });
          set((state) => {
            return {
              ...state,
              loading: false,
              error: null,
              todos: state.todos.map((todo) =>
                todo._id === id ? { ...todo, content } : todo
              ),
            };
          });
        } catch (error) {}
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
    async deleteTodo(id) {
      await todosService.remove(id);
      set({ todos: get().todos.filter((todo) => todo._id !== id) });
    },
    completedTodo(id) {
      set({
        todos: get().todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      });
    },
    async removeSelected() {
      const filtredTodos = get().todos.filter((todo) => todo.completed);
      filtredTodos.forEach(async (todo) => {
        await todosService.remove(todo._id);
      });
      set({
        todos: get().todos.filter((todo) => !todo.completed),
      });
    },
  }))
);

export const useAuth = create(
  devtools((set, get) => ({
    currentUser: localStorageService.getAccessToken()
      ? localStorageService.getCurrentUser()
      : null,
    loading: false,
    error: null,
    isAuth: !!localStorageService.getAccessToken() || false,
    async register(payload) {
      try {
        set({ loading: true });

        const data = await authService.register(payload);
        set({
          currentUser: { email: data.email, _id: data.localId },
          isAuth: true,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async login(payload) {
      try {
        set({ loading: true });
        const data = await authService.login(payload);

        set({
          currentUser: { email: data.email, _id: data.localId },
          isAuth: true,
        });
        return data;
      } catch (error) {
        set({ error: error.response.data.error });
        return get().error;
      }
    },
    logout() {
      localStorageService.removeAuthData();
      set({ isAuth: false, currentUser: null });
    },
  }))
);
