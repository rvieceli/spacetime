import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";
import * as SecureStore from "expo-secure-store";
import { JwtPayload, JwtTokenSchema } from "../lib/jwt";
import { login } from "../services/login";
import { api } from "../lib/api";
import { random } from "../lib/random";
import Constants from "expo-constants";

interface AuthState {
  status: "loading" | "authenticated" | "unauthenticated";
  access_token?: string;
  decoded?: JwtPayload;
}

interface AuthActions {
  login: (access_token: string) => Promise<void>;
  logout: () => void;
}

interface AuthStore {
  state: AuthState;
  actions: AuthActions;
}

export type SetStateProps = (store: AuthStore) => void;

const initialState: AuthState = {
  status: "loading",
  access_token: undefined,
  decoded: undefined,
};

const storage = createJSONStorage<string>(() => ({
  getItem: SecureStore.getItemAsync,
  removeItem: SecureStore.deleteItemAsync,
  setItem: SecureStore.setItemAsync,
}));

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => {
      const setState = (fn: SetStateProps) => set(produce(fn));
      return {
        state: {
          ...initialState,
        },
        actions: {
          async login(code: string) {
            const { access_token, decoded } = await login(code);

            setState(({ state }) => {
              state.status = "authenticated";
              state.access_token = access_token;
              state.decoded = decoded;
            });
          },
          logout() {
            setState(({ state }) => {
              state.status = "unauthenticated";
              state.access_token = undefined;
              state.decoded = undefined;
            });
          },
        },
      };
    },
    {
      name: "access_token_store",
      storage,
      partialize: ({ state }) => {
        return state.access_token;
      },
      merge: (access_token: string | undefined, store) => {
        return produce(store, (draft) => {
          if (!access_token) {
            draft.state.status = "unauthenticated";
            return;
          }

          const decoded = JwtTokenSchema.parse(access_token);

          if (decoded.exp.getTime() < Date.now()) {
            draft.state.status = "unauthenticated";
            return;
          }

          draft.state.status = "authenticated";
          draft.state.access_token = access_token;
          draft.state.decoded = decoded;
        });
      },
    }
  )
);

api.interceptors.request.use(
  async (config) => {
    const { access_token } = useAuthStore.getState().state;

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => error
);
