import { getUserId } from "../utils/getUserId";

export const Query = {
  async myPosts(
    parent,
    { query, first, skip, after, orderBy },
    { prisma, request },
    info
  ) {
    const userId = getUserId(request);

    const opArgs = {
      first,
      skip,
      after,
      orderBy,
      where: {
        author: {
          id: userId,
        },
      },
    };

    if (query) {
      opArgs.where.OR = [
        {
          title_contains: query,
        },
        {
          body_contains: query,
        },
      ];
    }

    const posts = await prisma.query.posts(opArgs, info);

    return posts;
  },

  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const user = await prisma.query.user({ where: { id: userId } }, info);

    return user;
  },

  async post(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request, false);

    const posts = await prisma.query.posts(
      {
        where: {
          id,
          OR: [
            {
              published: true,
            },
            {
              author: {
                id: userId,
              },
            },
          ],
        },
      },
      info
    );

    if (posts.length === 0) {
      throw new Error("Post não encontrado");
    }

    return posts;
  },

  users(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy,
    };

    if (query) {
      opArgs.where.OR = [
        {
          name_contains: query,
        },
      ];
    }

    return prisma.query.users(opArgs, info);
  },

  posts(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      orderBy,
      after,
      where: {
        published: true,
      },
    };

    if (query) {
      opArgs.where.OR = [
        {
          body_contains: query,
        },
        {
          title_contains: query,
        },
      ];
    }

    return prisma.query.posts(opArgs, info);
  },

  comments(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy,
    };

    if (query) {
      opArgs.where = {
        text: query,
      };
    }

    return prisma.query.comments(opArgs, info);
  },
};
