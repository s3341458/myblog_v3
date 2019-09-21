import { Auth } from 'aws-amplify'

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: process.env.GATSBY_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = async () => (await Auth.currentSession()).getAccessToken().getJwtToken();
  return {
    headers: {
      ...headers,
      "authorization": token ? token : "",
      "x-api-key": process.env.GATSBY_APPSYNC_API_KEY
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


export default client
