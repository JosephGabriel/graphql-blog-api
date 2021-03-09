import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../src/prisma";

export const userOne = {
  input: {
    name: "Joseph",
    email: "joseph@gmail.com",
    password: bcrypt.hashSync("joseph111", 10),
  },
  user: null,
  jwt: null,
};

export const userTwo = {
  input: {
    name: "Sara",
    email: "sara@gmail.com",
    password: bcrypt.hashSync("sarahh111", 10),
  },
  user: null,
  jwt: null,
};

export const postOne = {
  input: {
    title: "Prisma 101",
    body: "Prisma 101",
    published: true,
  },
  post: null,
};

export const postTwo = {
  input: {
    title: "Prisma 101",
    body: "Prisma 101",
    published: true,
  },
  post: null,
};

export const seedDatabase = async () => {
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  });

  userOne.jwt = jwt.sign(
    { userId: userOne.user.id },
    process.env.PRISMA_AUTH_SECRET,
    { expiresIn: "7d" }
  );

  userTwo.jwt = jwt.sign(
    { userId: userTwo.user.id },
    process.env.PRISMA_AUTH_SECRET,
    { expiresIn: "7d" }
  );

  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: { id: userOne.user.id },
      },
    },
  });

  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: { id: userOne.user.id },
      },
    },
  });
};
