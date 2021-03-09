import ApolloBoost from "apollo-boost";

export const getClient = (jwt) => {
  return new ApolloBoost({
    uri: "http://localhost:4000",
    request(operation) {
      if (jwt) {
        operation.setContext({
          headers: {
            Authorization: `${jwt}`,
          },
        });
      }
    },
  });
};
