import { z } from 'zod';

export const JwtTokenPayloadSchema = z.object({
  sub: z.string().uuid(),
  name: z.string(),
  avatar_url: z.string().url(),
});

export type JwtTokenPayload = z.output<typeof JwtTokenPayloadSchema>;
