import { z } from "zod";
import { api } from "@/lib/api";

export const ResponseSchema = z.object({
  file_url: z.string().url(),
});

export type Response = z.infer<typeof ResponseSchema>;

export async function upload(data: FormData) {
  const { file_url } = await api
    .post<Response>("/uploads", data)
    .then((response) => ResponseSchema.parse(response.data));

  return { file_url };
}
