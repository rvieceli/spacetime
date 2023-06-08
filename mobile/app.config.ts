import "dotenv/config";
import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    name: "mobile",
    slug: "mobile",
    ...config,
    extra: {
      THROTTLE_API: process.env.THROTTLE_API,
      API_URL: process.env.API_URL,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    },
  };
};
