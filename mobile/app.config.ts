import "dotenv/config";
import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    name: "mobile",
    slug: "mobile",
    ...config,
    extra: {
      BACKEND_URL: process.env.BACKEND_URL,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    },
  };
};
