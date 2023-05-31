import { useEffect } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store/useAuth.store";
import Constants from "expo-constants";

const clientId: string = Constants.expoConfig.extra.GITHUB_CLIENT_ID;

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${clientId}`,
};

const scheme = Constants.expoConfig.scheme;

export function useAuth() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme,
      }),
    },
    discovery
  );
  const router = useRouter();
  const login = useAuthStore((store) => store.actions.login);

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      login(code)
        .then(() => {
          router.push("/memories");
        })
        .catch((error) => console.error(error));
    }
  }, [response]);

  return {
    loaded: !!request,
    handleLogin: promptAsync,
  };
}
