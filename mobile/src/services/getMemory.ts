import { z } from "zod";
import { api } from "../lib/api";

const ResponseSchema = z.object({
  id: z.string().uuid(),
  content: z.string().trim().nonempty(),
  cover_url: z.string().url(),
  created_at: z.string().transform((date) => new Date(date)),
  is_mine: z.boolean(),
});

export type Response = z.infer<typeof ResponseSchema>;

export async function getMemory(id) {
  return api
    .get<Response>(`/memories/${id}`)
    .then((response) => ResponseSchema.parse(response.data));
}
