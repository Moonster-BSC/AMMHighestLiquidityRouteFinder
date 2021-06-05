import { quickClient } from "../apollo/client"
import { getPairGraphWithLiquidityWeights } from "../util/getAllPairs"


// Goals:
// Shortest Path from A to B
// With Highest liquidity

let currentRoute = []
let bestRoute = []
let solved = false

export const getShortestPathWithHighestLiquidity = async (startToken: string, endToken: string): Promise<string[]> => {
    const graph = await getPairGraphWithLiquidityWeights(quickClient)

    // DFS
    
    // init routes
    currentRoute.push(startToken)
    bestRoute.push(startToken)




}

const search