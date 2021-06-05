import { getAllPairsQuery } from "../apollo/queries";
import { ChainId, Pair, Token, TokenAmount } from 'quickswap-sdk'

const testAmount = '2000000000000000000'

export const getAllPairs = async (client) => {
    const { data } = await client.query({
        query: getAllPairsQuery
      });
    const { pairs } = data

    const pairMap: Record<string, Pair> = {}

    pairs.forEach(pair => {
        const { id, token0, token1 } = pair;
        const token0Object = new Token(ChainId.MATIC, token0.id, token0.decimals, token0.symbol, token0.name)
        const token1Object = new Token(ChainId.MATIC, token1.id, token1.decimals, token1.symbol, token1.name)
        const pairObject = new Pair(new TokenAmount(token0Object, testAmount), new TokenAmount(token1Object, testAmount))
        pairMap[id] = pairObject
    });
    return pairMap
}