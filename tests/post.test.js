import "cross-fetch/polyfill";
import { getClient } from "./utils/apolloClient";
import { seedDatabase, userOne, postOne, postTwo } from "./utils/seedDatabase";
import { gql } from "apollo-boost";
import { prisma } from "../src/prisma";
import { createPost, myPosts, getPost, deletePost } from "./utils/operations";

const client = getClient();

beforeEach(seedDatabase);

test("Deve fazer uma consulta e retornar um post", async () => {
  const response = await client.query({ query: getPost });

  expect(response.data.posts.length).toBe(2);
});

test("Deve retornar os posts do usuário", async () => {
  const clientAuth = getClient(userOne.jwt);

  const { data } = await clientAuth.query({ query: myPosts });

  expect(data.myPosts.length).toBe(2);
});

test("Deve atualizar o próprio post", async () => {
  const clientAuth = getClient(userOne.jwt);

  const updatePost = gql`
  mutation {
    updatePost(
      id: "${postOne.post.id}",
    data: {
      published: false,
    },) {
      published
    }
  }
`;

  const { data } = await clientAuth.mutate({ mutation: updatePost });
  const postExists = await prisma.exists.Post({
    id: postOne.post.id,
    published: false,
  });

  expect(data.updatePost.published).toBe(false);
  expect(postExists).toBe(true);
});

test("Deve criar um post", async () => {
  const clientAuth = getClient(userOne.jwt);

  const variables = {
    data: { title: "Prisma 102", body: "Prisma 102", published: true },
  };

  const { data } = await clientAuth.mutate({ mutation: createPost, variables });

  expect(data.createPost.title).toBe("Prisma 102");
  expect(data.createPost.body).toBe("Prisma 102");
  expect(data.createPost.published).toBe(true);
});

test("Deve deletar um post", async () => {
  const clientAuth = getClient(userOne.jwt);

  const variables = {
    id: postTwo.post.id,
  };

  await clientAuth.mutate({ mutation: deletePost, variables });
  const postExists = await prisma.exists.Post({ id: `${postTwo.post.id}` });

  expect(postExists).toBe(false);
});
