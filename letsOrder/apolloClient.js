// Apollo Setup 
import { ApolloProvider, graphql,withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { AsyncStorage } from 'react-native';
import { InMemoryCache, IntrospectionFragmentMatcher ,defaultDataIdFromObject} from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    onError: (e) => { console.log(e.graphQLErrors) },
});



const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    
    return AsyncStorage.getItem('JWT').then((token) => {

        if (token) {

            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                }
            }

        }
        return {
            headers: {
                ...headers,
            }
        }

    })
});


const cache = new InMemoryCache({
    dataIdFromObject: obj => {
        switch (obj.__typename) {
            case 'UserType':
                return defaultDataIdFromObject(obj);
            default:
                return defaultDataIdFromObject(obj);
        }
    },
    addTypename: true,
})


persistCache({
    cache,
    storage: AsyncStorage,
    trigger: 'background',
})


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
    queryDeduplication : true
})


export default client