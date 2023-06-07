import { z } from "zod";
import { api } from "../lib/api";
import { AxiosError } from "axios";

export const ResponseSchema = z.object({
  is_public: z.boolean().default(false),
  content: z.string().trim().nonempty(),
  cover_url: z.string().url(),
});

export type Response = z.infer<typeof ResponseSchema>;

export async function createMemoryWithUpload(data: FormData) {
  return api
    .post<Response>("/memories/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => ResponseSchema.parse(response.data))
    .catch((error) => {
      if (error instanceof AxiosError) {
        if (typeof error.response?.data.message === "string") {
          throw new Error(error.response?.data.message);
        }

        if (error.response?.data.error === "Validation failed") {
          throw new Error("Validation failed", {
            cause: error.response?.data.message,
          });
        }
      }
      throw error;
    });
}
