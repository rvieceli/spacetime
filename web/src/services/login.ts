import { api } from "@/lib/api";
import { JwtTokenSchema } from "@/lib/jwt";
import { z } from "zod";

export const LoginResponseSchema = z
  .object({
    access_token: z.string(),
  })
  .transform((data) => ({
    ...data,
    decoded: JwtTokenSchema.parse(data.access_token),
  }));

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export async function login(code: string) {
  const { access_token, decoded } = await api
    .post<LoginResponse>("/auth/github", undefined, {
      params: { code },
    })
    .then((response) => LoginResponseSchema.parse(response.data));

  return { access_token, decoded };
}
