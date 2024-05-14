import { z } from 'zod';

export const schema = z.object({
  hashnodeWeekly: z.boolean().default(false),
  activityNotifications: z.boolean().default(false),
  generalAnnouncements: z.boolean().default(false),
  monthlyBlogStats: z.boolean().default(false),
  referralNotifications: z.boolean().default(false),
  newFollowersWeekly: z.boolean().default(false),
});

export type FormFieldValues = z.infer<typeof schema>;
