import { quickClient } from "../apollo/client"
import { getPairGraphWithLiquidityWeights } from "../util/getAllPairs"

export const getShortestPathWithHighestLiquidity = async (startToken: string, endToken: string): Promise<string[]> => {
    const graph = await getPairGraphWithLiquidityWeights(quickClient)
}