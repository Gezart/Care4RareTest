// Add Apollo Client to this file
import { ApolloClient,InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/graphql`,
    // cache: new InMemoryCache(),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
      }
})
