import gql from 'graphql-tag';

export const getAllPairsQuery = (pairs, startTimestamp, endTimestamp) => {
  let pairsString = `[`;
  pairs.map(pair => {
    return (pairsString += `"${pair}"`);
  });
  pairsString += ']';
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
