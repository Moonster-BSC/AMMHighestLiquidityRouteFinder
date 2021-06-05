import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const getAllPairsQuery = (USDThreshold: number): DocumentNode => {
  const queryString = `
    query getAllPairs {
      pairs(first: 1000, orderBy: reserveUSD, orderDirection: desc, where: {reserveUSD_gt: ${USDThreshold}}) {
        id
        token0 {
          id
          decimals
          symbol
          name
        }
        token1 {
          id
          decimals
          symbol
          name
        }
        reserveUSD
      }
    }
`;
  return gql(queryString);
};
