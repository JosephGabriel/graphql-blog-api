let users = [
  {
    id: "1",
    name: "Joseph",
    email: "cronos@gmail.com",
  },
  {
    id: "2",
    name: "Alan",
    email: "alan@gmail.com",
  },
  {
    id: "3",
    name: "Sarah",
    email: "sarah@gmail.com",
  },
];

let posts = [
  {
    id: "101",
    title: "GraphQL 101",
    body: "Lorem Ipsum ",
    published: true,
    author: "1",
  },
  {
    id: "102",
    title: "GraphQL 201",
    body: "Lorem Ipsum",
    published: true,
    author: "2",
  },
  {
    id: "103",
    title: "Programing Music",
    body: "Lorem Ipsum",
    published: false,
    author: "3",
  },
];

let comments = [
  {
    id: "1",
    text: "Cool post",
    author: "1",
    post: "101",
  },
  {
    id: "2",
    text: "Awesome api",
    author: "2",
    post: "102",
  },
  {
    id: "3",
    text: "Good explain",
    author: "3",
    post: "103",
  },
];

export const db = {
  users,
  posts,
  comments,
};
