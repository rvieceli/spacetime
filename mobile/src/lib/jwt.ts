import jwtDecode from "jwt-decode";
import { z } from "zod";

const JwtPayloadSchema = z.object({
  sub: z.string().uuid(),
  name: z.string(),
  avatar_url: z.string().url(),
  iat: z.number().transform((iat) => new Date(iat * 1000)),
  exp: z.number().transform((exp) => new Date(exp * 1000)),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

export const JwtTokenSchema = z
  .string()
  .transform((token) => JwtPayloadSchema.parse(jwtDecode<JwtPayload>(token)));
