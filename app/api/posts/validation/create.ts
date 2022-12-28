import { z } from "zod";
import { isEmpty, isInvalidDate } from "~/utils/assertion";
import { HTTPError } from "ky-universal";
import { STATUS_CODE } from "~/constants/constant";

export const createPostSchema = z.object({
  title: z.string().max(100),
  subTitle: z.string().max(100).optional().nullable(),
  description: z.string().min(140).max(156),
  content: z.string(),
  thumbnail: z.object({
    idx: z.number().optional().nullable(),
    url: z.string().url(),
  }),
  tags: z.array(z.string()).max(5).nullable().optional(),
  disabledComment: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  hasPublishedTime: z.boolean().optional(),
  publishingDate: z.date().min(new Date()).optional().nullable(),
});
