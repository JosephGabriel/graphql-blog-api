import { extractFragmentReplacements } from "prisma-binding";
import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { Comment } from "./Comment";
import { Post } from "./Post";
import { User } from "./User";
import { Subscription } from "./Subscription";

export const resolvers = {
  Query,
  Mutation,
  Comment,
  Post,
  User,
  Subscription,
};

export const fragmentReplacements = extractFragmentReplacements(resolvers);
