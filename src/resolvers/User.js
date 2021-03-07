import { getUserId } from "../utils/getUserId";

export const User = {
  email: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request);

      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    },
  },

  posts: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);

      return prisma.query.posts(
        {
          where: {
            published: true,
            author: {
              id: parent.id,
            },
          },
        },
        info
      );
    },
  },
};
