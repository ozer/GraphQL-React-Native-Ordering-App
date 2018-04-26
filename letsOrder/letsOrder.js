import React from 'react';
import deepDiffer from 'react-native/lib/deepDiffer';
import PrimaryNavigator from './navigation/navigation';

// Apollo Setup
import { ApolloProvider } from 'react-apollo';

import { NavigationActions, addNavigationHelpers, StateUtils } from 'react-navigation';
import apolloClient from './apolloClient';

const initialState = PrimaryNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SignInStack' }));


export default class letsOrder extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <PrimaryNavigator />
      </ApolloProvider>
    );
  }
}
