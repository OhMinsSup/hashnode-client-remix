import { json } from "@remix-run/cloudflare";

export const settingsEmailLayoutLoader = async () => {
  const items = [
    {
      id: 1,
      label: "Hashnode weekly",
      description:
        "Curated weekly newsletter with best stories and discussions",
      checked: true,
    },
    {
      id: 2,
      label: "Activities related to you and your content",
      description: "Replies, Responses, Reactions, Mentions etc…",
      checked: true,
    },
    {
      id: 3,
      label: "General announcements",
      description: "Product updates, feature additions, etc...",
      checked: true,
    },
    {
      id: 4,
      label: "Monthly blog posts stats newsletter",
      description: "Get monthly stats for your blog posts via email",
      checked: true,
    },
    {
      id: 5,
      label: "New Followers Weekly",
      description: "Get weekly stats about new followers",
      checked: true,
    },
    {
      id: 6,
      label: "Referral Notifications",
      description:
        "Get notified on Successful Referrals, Hashnode Ambassador Eligibility, Swag Kit Eligibility, etc...",
      checked: true,
    },
  ] as FetchSchema.SettingEmailItems[];
  return json({
    items,
  });
};

export type RoutesLoaderData = typeof settingsEmailLayoutLoader;
