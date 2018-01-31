import React, { Component } from 'react';


import PrimaryNavigator from './navigation/navigation';
import navHelpers from './navigation/navHelpers';

// Apollo Setup 
import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';


//import reducer
import { connect, Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { auth } from './src/reducers/authReducer';

// RN UI Element Setup
import {
    View,
    Text,
    AsyncStorage,
    StatusBar,
    StatusBarIOS
} from 'react-native';
import { NavigationActions, addNavigationHelpers, StackNavigator } from 'react-navigation';
import SignIn from './src/containers/Auth/SignIn';
import SignUp from './src/containers/Auth/SignUp';
import apolloClient from './apolloClient';

export default class letsOrder extends React.Component {

    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <PrimaryNavigator />
            </ApolloProvider>
        )
    }

}