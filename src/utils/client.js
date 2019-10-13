import Amplify, { Auth } from "aws-amplify"

import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createAppSyncLink, AUTH_TYPE } from "aws-appsync"
import awsconfig from "../aws-exports"
//import AWSAppSyncClient from 'aws-appsync'

//Amplify.awsconfigure({
//Auth: {
//identityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID,
//region: process.env.GATSBY_AWS_REGION,
//userPoolId: process.env.GATSBY_AWS_USER_POOL_ID,
//userPoolWebClientId: process.env.GATSBY_AWS_USER_POOL_CLIENT_ID,
//authenticationFlowType: 'USER_PASSWORD_AUTH'
//}

//})
//
Amplify.configure(awsconfig)

const httpLink = createHttpLink({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
})

const awsPrivateLink = createAppSyncLink({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
})

const awsPublicLink = createAppSyncLink({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: { type: AUTH_TYPE.API_KEY, apiKey: awsconfig.aws_appsync_apiKey },
})

export const publicClient = new ApolloClient({
  link: awsPublicLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default new ApolloClient({
  link: awsPrivateLink.concat(httpLink),
  cache: new InMemoryCache(),
})
