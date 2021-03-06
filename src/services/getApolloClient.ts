import { HttpLink, split, ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import websocket from "websocket";

export const getApolloClient = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "same-origin",
  });
  const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/subscriptions",
    options: {
      reconnect: true,
    },
    webSocketImpl: websocket.w3cwebsocket,
  });
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
  return client;
};
