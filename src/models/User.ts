import { z } from 'zod';

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    username: z.string(),
    phone: z.string()
});

export type User = z.infer<typeof userSchema>;