import { z } from 'zod';

export const CreateMemorySchema = z.object({
  cover_url: z.string().url(),
  content: z.string().min(1).max(1000),
  is_public: z.coerce.boolean().default(false),
});

export type CreateMemoryDto = z.infer<typeof CreateMemorySchema>;
