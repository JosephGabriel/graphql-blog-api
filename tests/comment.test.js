import "cross-fetch/polyfill";
import { getClient } from "./utils/apolloClient";
import { gql } from "apollo-boost";
import { seedDatabase, userOne, postOne } from "./utils/seedDatabase";
import { prisma } from "../src/prisma";

const client = getClient();

beforeEach(seedDatabase);

test("Deve criar um comentario em um post", async () => {
  // const clientAuth = getClient(userOne.jwt)
  return null;
});
