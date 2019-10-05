import Amplify, { Auth } from 'aws-amplify';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

Amplify.configure({
  Auth: {
        identityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID,
        region: process.env.GATSBY_AWS_REGION,
        userPoolId: process.env.GATSBY_AWS_USER_POOL_ID,
        userPoolWebClientId: process.env.GATSBY_AWS_USER_POOL_CLIENT_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }

})

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
