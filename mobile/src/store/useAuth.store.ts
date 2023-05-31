import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";
import * as SecureStore from "expo-secure-store";
import { JwtPayload, JwtTokenSchema } from "../lib/jwt";
import { login } from "../services/login";

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

// interface AuthStore {
//   isReady: boolean;
//   access_token?: string;
//   payload?: JwtPayload;
//   login: (access_token: string) => void;
//   logout: () => void;
// }

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
              state.access_token = access_token;
              state.decoded = decoded;
            });
          },
          logout() {
            setState(({ state }) => {
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
