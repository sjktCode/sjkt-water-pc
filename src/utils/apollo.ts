import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { AUTH_TOKEN } from './constants';

import { currentOrg } from '.';

const httpLink = createHttpLink({
    uri: 'https://sjkt-water-server.vercel.app/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
            orgId: currentOrg()?.value,
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
    },
    cache: new InMemoryCache({
        addTypename: false,
    }),
});
