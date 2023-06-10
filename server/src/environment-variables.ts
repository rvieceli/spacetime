import { z } from 'zod';

export const EnvironmentVariablesSchema = z.object({
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().or(z.number()),

  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET_NAME: z.string(),
  AWS_ENDPOINT_URL: z.string().url().optional(),

  THROTTLE_API: z
    .any()
    .optional()
    .default(false)
    .transform((value) => !!value),
});

export type EnvironmentVariables = z.output<typeof EnvironmentVariablesSchema>;
