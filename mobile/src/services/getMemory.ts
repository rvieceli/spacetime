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
  // sleep for 2 secods
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return api
    .get<Response>(`/memories/${id}`)
    .then((response) => ResponseSchema.parse(response.data));
}
