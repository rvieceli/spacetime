import { z } from 'zod';

export const CreateUserSchema = z.object({
  github_id: z.number(),
  name: z.string(),
  login: z.string(),
  avatar_url: z.string().url(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
