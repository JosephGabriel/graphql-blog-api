import "cross-fetch/polyfill";
import { getClient } from "./utils/apolloClient";
import { seedDatabase, userOne } from "./utils/seedDatabase";
import { prisma } from "../src/prisma";
import {
  badLogin,
  createUser,
  getProfile,
  badSignIn,
  getUser,
} from "./utils/operations";

const client = getClient();

beforeEach(seedDatabase);

test("Deve criar um novo usuário", async () => {
  const variables = {
    data: {
      name: "Alice",
      email: "alice@gmail.com",
      password: "alice12345",
    },
  };

  const response = await client.mutate({ mutation: createUser, variables });

  const userExists = await prisma.exists.User({
    id: response.data.createUser.user.id,
  });

  expect(userExists).toBe(true);
});

test("Deve retornar as informações publicas de um usuário", async () => {
  const response = await client.query({ query: getUser });

  expect(response.data.users.length).toBe(2);
  expect(response.data.users[0].email).toBe(null);
});

test("Não deve fazer login usando informações erradas", async () => {
  const variables = {
    data: { email: "cronos@gmail.com", password: "daredevil" },
  };

  await expect(
    client.mutate({ mutation: badLogin, variables })
  ).rejects.toThrow();
});

test("Não deve fazer cadastro usando senha curta", async () => {
  const variables = {
    data: { email: "cronos@gmail.com", password: "dared" },
  };

  await expect(
    client.mutate({ mutation: badSignIn, variables })
  ).rejects.toThrow();
});

test("Deve retornar o perfil de um usuário", async () => {
  const clientAuth = getClient(userOne.jwt);

  const { data } = await clientAuth.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
