import { z } from 'zod';

export const UpdateMemorySchema = z.object({
  cover_url: z.string().url().optional(),
  content: z.string().min(1).max(1000).optional(),
  is_public: z.coerce.boolean().optional(),
});

export type UpdateMemoryDto = z.infer<typeof UpdateMemorySchema>;
