import { GraphQLClient } from "graphql-request";

const endpoint =
  import.meta.env.VITE_GRAPHQL_URL || "http://localhost:4000/graphql";

export const gqlClient = new GraphQLClient(endpoint, {
  credentials: "include",
});
