import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_GRAPHQL_URL;

export const gqlClient = new GraphQLClient(endpoint, {
  credentials: "include",
});
