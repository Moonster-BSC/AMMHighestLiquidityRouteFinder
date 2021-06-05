import { getAllPairsQuery } from "../apollo/queries";
import { quickClient } from "../apollo/client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";

// Goals:
// Shortest Path from A to B
// With Highest liquidity

interface AdjacencyMap {
    [symbol: string]: {
        [symbol: string]: number   
    }
}

export const getPairGraphWithLiquidityWeights = async (client: ApolloClient<NormalizedCacheObject>): Promise<AdjacencyMap> => {
    const USDThreshold = 500000; // We don't want to use anything with less than 100000 liquidity or else it may incur lots of slippage
    const { data } = await client.query({
        query: getAllPairsQuery(USDThreshold)
      });
    const { pairs } = data

    const pairAdjacencyMap: AdjacencyMap = {}

    pairs.forEach((pair: { id: any; token0: any; token1: any; reserveUSD: any }) => {
        const { id, token0: {symbol: tokenA}, token1: {symbol: tokenB}, reserveUSD } = pair;

        // put in map
        putInMap(pairAdjacencyMap, tokenA, tokenB, reserveUSD)

        // other direction
        putInMap(pairAdjacencyMap, tokenB, tokenA, reserveUSD)
    });

    return pairAdjacencyMap
}

const putInMap = (pairAdjacencyMap: AdjacencyMap, tokenA: string, tokenB: string, reserveUSD: number) => {
    if (tokenA in pairAdjacencyMap) {
        pairAdjacencyMap[tokenA][tokenB] = reserveUSD
    } else {
        pairAdjacencyMap[tokenA] = {}
        pairAdjacencyMap[tokenA][tokenB] = reserveUSD
    }
}