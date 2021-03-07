import { getUserId } from "../utils/getUserId";

export const Subscription = {
  comment: {
    subscribe(parent, { id }, { prisma }, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id,
              },
            },
          },
        },
        info
      );
    },
  },

  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              post: {
                published: true,
              },
            },
          },
        },
        info
      );
    },
  },

  myPosts: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);

      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId,
              },
            },
          },
        },
        info
      );
    },
  },
};
