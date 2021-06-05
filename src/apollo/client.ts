import { ApolloClient } from 'apollo-client'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const quickClient = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06',
    fetch: fetch as unknown as WindowOrWorkerGlobalScope['fetch'],
  }),
  cache: new InMemoryCache(),
});


module.exports = {
  quickClient,
};
