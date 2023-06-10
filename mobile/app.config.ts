import "dotenv/config";
import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    name: "mobile",
    slug: "mobile",
    ...config,
    extra: {
      API_URL: process.env.API_URL,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    },
  };
};
