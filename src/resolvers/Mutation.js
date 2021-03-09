import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { hashPassword } from "../utils/hashPassword";
import { getUserId } from "../utils/getUserId";

export const Mutation = {
  async logginUser(parent, { data }, { prisma }, info) {
    const user = await prisma.query.user({ where: { email: data.email } });

    if (!user) {
      throw new Error("Email ou Senha Inválido 1");
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new Error("Email ou Senha Inválido 2");
    }

    const token = await generateToken(user.id);

    return {
      token,
      user,
    };
  },

  async createUser(parent, { data }, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: data.email });

    if (emailTaken) {
      throw new Error("Email em uso");
    }

    const password = await hashPassword(data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },

  async createPost(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.User({ id: userId });

    if (!postExists) {
      throw new Error("Usuário inválido");
    }

    const post = await prisma.mutation.createPost(
      { data: { ...data, author: { connect: { id: userId } } } },
      info
    );

    return post;
  },

  async createComment(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: data.post,
      published: true,
    });

    if (!postExists) {
      throw new Error("Post não existente");
    }

    const comment = prisma.mutation.createComment(
      {
        data: {
          ...data,
          author: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: data.post,
            },
          },
        },
      },
      info
    );

    return comment;
  },

  async updateUser(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    if (typeof data.password === "string") {
      data.password = await hashPassword(data.password);
    }

    const user = await prisma.mutation.updateUser(
      {
        data,
        where: {
          id: userId,
        },
      },
      info
    );

    return user;
  },

  async updatePost(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({ id, author: { id: userId } });

    if (!postExists) {
      throw new Error("Post inválido");
    }

    const isPublished = await prisma.exists.Post({ id, published: true });

    if (isPublished && data.published === false) {
      await prisma.mutation.deleteManyComments({ where: { post: { id } } });
    }

    const post = await prisma.mutation.updatePost(
      { ...data, where: { id } },
      info
    );

    return post;
  },

  async updateComment(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: { id: userId },
    });

    if (!commentExists) {
      throw new Error("Comentário inválido");
    }

    const comment = await prisma.mutation.updateComment(
      { ...data, where: { id } },
      info
    );

    return comment;
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({ id: userId });

    if (!userExists) {
      throw new Error("Usuário inválido");
    }

    const deletedUser = await prisma.mutation.deleteUser(
      { where: { id: userId } },
      info
    );

    return deletedUser;
  },

  async deletePost(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({ id, author: { id: userId } });

    if (!postExists) {
      throw new Error("Post inválido");
    }

    const post = await prisma.mutation.deletePost({ where: { id } }, info);

    return post;
  },

  async deleteComment(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Comment({
      id,
      author: { id: userId },
    });

    if (!postExists) {
      throw new Error("Comentário inválido");
    }

    const comment = await prisma.mutation.deleteComment({ where: { id } });

    return comment;
  },
};
