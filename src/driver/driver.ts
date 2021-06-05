import { quickClient } from "../apollo/client"
import { getPairGraphWithLiquidityWeights } from "../util/getAllPairs"

export const getShortestPathWithHighestLiquidity = () => {
    const graph = getPairGraphWithLiquidityWeights(quickClient)
}