import { z } from "zod";
import { api } from "../lib/api";
import { AxiosError } from "axios";

export const ResponseSchema = z.object({
  is_public: z.boolean().default(false),
  content: z.string().trim().nonempty(),
  cover_url: z.string().url(),
});

export type Data = z.input<typeof ResponseSchema>;
export type Response = z.output<typeof ResponseSchema>;

export async function createMemory(data: Data) {
  return api
    .post<Response>("/memories", data)
    .then((response) => ResponseSchema.parse(response.data));
}
