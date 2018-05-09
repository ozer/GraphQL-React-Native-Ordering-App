import React from 'react';
// Apollo Setup
import { ApolloProvider } from 'react-apollo';
import PrimaryNavigator from './navigation/navigation';
import apolloClient from './apolloClient';

export default class aslanOrder extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <PrimaryNavigator />
      </ApolloProvider>
    );
  }
}