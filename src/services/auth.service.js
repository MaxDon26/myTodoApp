import axios from "axios";
import localStorageService from "./localStorage.service";

const auth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
});

const authService = {
  register: async (payload) => {
    const { data } = await auth.post("accounts:signUp", {
      ...payload,
      returnSecureToken: true,
    });
    localStorageService.setTokens(data);
    return data;
  },
  login: async (payload) => {
    const { data } = await auth.post("accounts:signInWithPassword", {
      ...payload,
      returnSecureToken: true,
    });

    localStorageService.setTokens(data);
    return data;
  },
  refresh: async () => {
    const { data } = await auth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
