import { getAllPairsQuery } from "../apollo/queries";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";

export interface AdjacencyMap<T> {
    [symbol: string]: {
        [symbol: string]: T   
    }
}

export const getPairGraphWithLiquidityWeights = async (client: ApolloClient<NormalizedCacheObject>, USDThreshold: number): Promise<AdjacencyMap<number>> => {
    const { data } = await client.query({
        query: getAllPairsQuery(USDThreshold)
      });
    const { pairs } = data

    const pairAdjacencyMap: AdjacencyMap<number> = {}

    pairs.forEach((pair: { id: any; token0: any; token1: any; reserveUSD: any }) => {
        const { id, token0: {symbol: tokenA}, token1: {symbol: tokenB}, reserveUSD }: {
            id: string;
            token0: any;
            token1: any;
            reserveUSD: string;
        } = pair;

        const liquidity = Number(reserveUSD)
        // put in map
        putInMap(pairAdjacencyMap, tokenA, tokenB, liquidity)
        putInMap(pairAdjacencyMap, tokenA, tokenB, liquidity)

        // other direction
        putInMap(pairAdjacencyMap, tokenB, tokenA, liquidity)
    });

    return pairAdjacencyMap
}

const putInMap = <T>(pairAdjacencyMap: AdjacencyMap<T>, tokenA: string, tokenB: string, data: T) => {
    if (tokenA in pairAdjacencyMap) {
        pairAdjacencyMap[tokenA][tokenB] = data
    } else {
        pairAdjacencyMap[tokenA] = {}
        pairAdjacencyMap[tokenA][tokenB] = data
    }
}