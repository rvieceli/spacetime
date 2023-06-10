import { z } from "zod";
import { api } from "@/lib/api";

const ResponseSchema = z.object({
  url: z.string().url(),
  fields: z.record(z.string()),
  file_url: z.string().url(),
});

export async function createUploadSignature(contentType: string) {
  return api
    .post<Response>("/uploads/sign", { contentType })
    .then((response) => ResponseSchema.parse(response.data));
}
