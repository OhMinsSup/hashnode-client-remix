import { z } from 'zod';

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
      { message: 'Invalid github url' },
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
      { message: 'Invalid facebook url' },
    ),
  twitter: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const regex =
          /(http|https):\/\/x\.com\/(.+)|(http|https):\/\/www\.x\.com\/(.+)/;
        return regex.test(val);
      },
      { message: 'Invalid x url' },
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
      { message: 'Invalid instagram url' },
    ),
  stackoverflow: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const regex =
          /(http|https):\/\/stackoverflow\.com\/(.+)|(http|https):\/\/www\.stackoverflow\.com\/(.+)/;
        return regex.test(val);
      },
      { message: 'Invalid stackoverflow url' },
    ),
  youtube: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const regex =
          /(http|https):\/\/youtube.com\/channel\/(.+)|(http|https):\/\/www.youtube.com\/channel\/(.+)|(http|https):\/\/youtube.com\/c\/(.+)|(http|https):\/\/www.youtube.com\/c\/(.+)|(http|https):\/\/youtube.com\/@([a-zA-Z0-9._-]+)|(http|https):\/\/www.youtube.com\/@([a-zA-Z0-9._-]+)/;
        return regex.test(val);
      },
      { message: 'Invalid youtube url' },
    ),
  linkedin: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const regex =
          /(http|https):\/\/linkedin.com\/in\/(.+)|(http|https):\/\/www.linkedin.com\/in\/(.+)|(http|https):\/\/linkedin.com\/company\/(.+)|(http|https):\/\/www.linkedin.com\/company\/(.+)/;
        return regex.test(val);
      },
      { message: 'Invalid linkedin url' },
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
      { message: 'Invalid website url' },
    ),
});

export const schema = z.object({
  nickname: z.string().min(1).max(20),
  username: z.string().min(1).max(20),
  email: z.string().email(),
  tagline: z.string().max(255).optional(),
  image: z.string().url().optional(),
  location: z.string().max(255).optional(),
  bio: z.string().max(255).optional(),
  skills: z.array(z.string()).max(10).optional(),
  availableText: z.string().max(140).optional(),
  socials: socialSchema.optional(),
});

export type FormFieldValues = z.infer<typeof schema>;
