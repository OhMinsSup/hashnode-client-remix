import { delayPromise } from "~/utils/util";

export const getTendingTags = async () => {
  await delayPromise(1000);
  return {
    tags: [
      {
        count: 465,
        node: {
          id: 1,
          name: "JavaScript",
          slug: "javascript",
        },
      },
      {
        count: 298,
        node: {
          id: 2,
          name: "Web Development",
          slug: "web-development",
        },
      },
      {
        count: 239,
        node: {
          numPosts: 966,
          id: 3,
          name: "iwritecode",
          slug: "iwritecode",
        },
      },
      {
        count: 234,
        node: {
          name: "Beginner Developers",
          slug: "beginners",
          id: 4,
        },
      },
      {
        count: 169,
        node: {
          name: "4articles4weeks",
          slug: "4articles4weeks",
          id: 5,
        },
      },
    ],
  };
};
