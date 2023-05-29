import { z } from 'zod';

export const EnvironmentVariablesSchema = z.object({
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().or(z.number()),
});

export type EnvironmentVariables = z.output<typeof EnvironmentVariablesSchema>;
