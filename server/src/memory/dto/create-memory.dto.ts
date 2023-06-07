import { z } from 'zod';

export const CreateMemorySchema = z.object({
  content: z.string().min(1).max(5000),
  is_public: z.coerce.boolean().default(false),
});

export const CreateMemoryWithCoverUrlSchema = CreateMemorySchema.extend({
  cover_url: z.string().url(),
});

export type CreateMemoryDto = z.infer<typeof CreateMemorySchema>;
export type CreateMemoryWithCoverUrlDto = z.infer<
  typeof CreateMemoryWithCoverUrlSchema
>;
