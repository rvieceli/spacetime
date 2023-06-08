import { z } from "zod";
import { api } from "../lib/api";

const MemorySchema = z.object({
  id: z.string().uuid(),
  excerpt: z.string().trim().nonempty(),
  cover_url: z.string().url(),
  created_at: z.string().transform((date) => new Date(date)),
  is_mine: z.boolean(),
});

export const ResponseSchema = z.array(MemorySchema);

export type Response = z.infer<typeof ResponseSchema>;

export async function getMemories() {
  return api
    .get<Response>("/memories")
    .then((response) => ResponseSchema.parse(response.data));
}
