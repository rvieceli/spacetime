import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";
import { DefaultColors } from "tailwindcss/types/generated/colors.js";

const fullConfig = resolveConfig(tailwindConfig);

export const colors = fullConfig.theme.colors as unknown as DefaultColors;
