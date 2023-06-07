import { z } from "zod";
import { JwtTokenSchema } from "../lib/jwt";
import { api } from "../lib/api";

export const ResponseSchema = z
  .object({
    access_token: z.string(),
  })
  .transform((data) => ({
    ...data,
    decoded: JwtTokenSchema.parse(data.access_token),
  }));

export type Response = z.infer<typeof ResponseSchema>;

export async function login(code: string) {
  const { access_token, decoded } = await api
    .post<Response>("/auth/github", undefined, {
      params: { code },
    })
    .then((response) => ResponseSchema.parse(response.data));

  return { access_token, decoded };
}
