import { z } from "zod";

export const userUpdateSocialSchema = z.object({
  github: z
    .string()
    .url()
    .regex(
      /(http|https):\/\/github\.com\/(.+)|(http|https):\/\/www\.github\.com\/(.+)/
    )
    .optional(),
  facebook: z
    .string()
    .url()
    .regex(
      /(http|https):\/\/facebook\.com\/(.+)|(http|https):\/\/www\.facebook\.com\/(.+)|(http|https):\/\/fb\.com\/(.+)|(http|https):\/\/www\.fb\.com\/(.+)/
    )
    .optional(),
  twitter: z
    .string()
    .url()
    .regex(
      /(http|https):\/\/twitter\.com\/(.+)|(http|https):\/\/www\.twitter\.com\/(.+)/
    )
    .optional(),
  instagram: z
    .string()
    .url()
    .regex(
      /(http|https):\/\/instagram\.com\/(.+)|(http|https):\/\/www\.instagram\.com\/(.+)/
    )
    .optional(),
  website: z.string().url().optional(),
});

export const userUpdateSchema = z.object({
  name: z.string().min(1).max(20),
  username: z.string().min(1).max(20),
  email: z.string().email(),
  tagline: z.string().max(255).optional(),
  avatarUrl: z.string().url().optional(),
  location: z.string().max(255).optional(),
  bio: z.string().max(255).optional(),
  skills: z.array(z.string()).max(10).optional(),
  availableText: z.string().max(140).optional(),
  socials: userUpdateSocialSchema.optional(),
});

export type UserUpdateBody = z.infer<typeof userUpdateSchema>;
