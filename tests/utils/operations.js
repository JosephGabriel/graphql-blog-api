import { gql } from "apollo-boost";

export const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
      }
    }
  }
`;

export const getUser = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const badLogin = gql`
  mutation($data: LoginUserInput!) {
    logginUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const badSignIn = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

export const getPost = gql`
  query {
    posts {
      id
      title
    }
  }
`;

export const myPosts = gql`
  query {
    myPosts {
      id
      title
      body
      published
    }
  }
`;

export const createPost = gql`
  mutation($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      body
      published
    }
  }
`;

export const deletePost = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const updatePost = gql`
  mutation($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      published
    }
  }
`;
