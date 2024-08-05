import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  // The below url is not working so I have just add url and logic of saving data
  uri: "https://sse-frontend-assessment-api-823449bb66ac.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default client;
