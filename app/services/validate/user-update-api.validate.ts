import { z } from "zod";

export const socialSchema = z.object({
  github: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const regex =
          /(http|https):\/\/github\.com\/(.+)|(http|https):\/\/www\.github\.com\/(.+)/;
        return regex.test(val);
      },
      { message: "Invalid github url" }
    ),
  facebook: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const regex =
          /(http|https):\/\/facebook\.com\/(.+)|(http|https):\/\/www\.facebook\.com\/(.+)|(http|https):\/\/fb\.com\/(.+)|(http|https):\/\/www\.fb\.com\/(.+)/;
        return regex.test(val);
      },
      { message: "Invalid facebook url" }
    ),
  twitter: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const regex =
          /(http|https):\/\/twitter\.com\/(.+)|(http|https):\/\/www\.twitter\.com\/(.+)/;
        return regex.test(val);
      },
      { message: "Invalid twitter url" }
    ),
  instagram: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const regex =
          /(http|https):\/\/instagram\.com\/(.+)|(http|https):\/\/www\.instagram\.com\/(.+)/;
        return regex.test(val);
      },
      { message: "Invalid instagram url" }
    ),
  website: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const regex = /(http|https):\/\/(.+)|(http|https):\/\/www\.(.+)/;
        return regex.test(val);
      },
      { message: "Invalid website url" }
    ),
});

export const schema = z.object({
  nickname: z.string().min(1).max(20),
  username: z.string().min(1).max(20),
  email: z.string().email(),
  tagline: z.string().max(255).optional(),
  avatarUrl: z.string().url().optional(),
  location: z.string().max(255).optional(),
  bio: z.string().max(255).optional(),
  skills: z.array(z.string()).max(10).optional(),
  availableText: z.string().max(140).optional(),
  socials: socialSchema.optional(),
});

export type FormFieldValues = z.infer<typeof schema>;
