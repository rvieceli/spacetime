import axios from "axios";
import { getCookie } from "./cookie";

const isSSR = typeof window === "undefined";

export const api = axios.create({
  baseURL: isSSR ? process.env.BACKEND_URL : "/api/proxy",
});

if (isSSR) {
  api.interceptors.request.use(
    (config) => {
      const access_token = getCookie("access_token");

      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }

      return config;
    },
    (error) => error
  );
}
