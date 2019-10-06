import "typeface-montserrat"
import "typeface-merriweather"
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './src/utils/client';

import { Provider } from 'react-redux';
import store from './src/state';

export default ({ element }) => (
  <Provider store={store}>
    <ApolloProvider client={client}>
        {element}
    </ApolloProvider>
  </Provider>
);
