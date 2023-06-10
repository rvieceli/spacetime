import axios from "axios";
import Constants from "expo-constants";

export const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.BACKEND_URL,
});
