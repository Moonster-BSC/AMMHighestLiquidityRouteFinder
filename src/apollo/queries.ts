import gql from 'graphql-tag';

export const getAllPairsQuery = () => {
  const queryString = `
    query getAllPairs {
      pairs {
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
      }
    }
`;
  return gql(queryString);
};
