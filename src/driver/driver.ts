import { quickClient } from "../apollo/client"
import { AdjacencyMap, getPairGraphWithLiquidityWeights } from "../util/getAllPairs"


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

const search = (graph: AdjacencyMap<number>, currentRoute: string[], tokenA: string, tokenB: string) => {
    const getAllNextPathsLiquidityDesc = (graph: AdjacencyMap<number>, tokenA: string) => {
        const edgeMap = graph[tokenA];
        const edgeEntries = Object.entries(edgeMap)
        const edgeEntriesLiquidityDesc = edgeEntries.sort((a, b) => {
            const [ symbolA, liquidityA ] = a
            const [ symbolB, liquidityB ] = b
            return liquidityA - liquidityB
        })
        return edgeEntriesLiquidityDesc
    }

    const edgeEntriesLiquidityDesc = getAllNextPathsLiquidityDesc(graph, tokenA)

    for (const entry of edgeEntriesLiquidityDesc) {
        const [ symbol, liquidity ] = entry
        currentRoute.push(symbol)
        if (symbol === tokenB) {
            // solution is found. Since we always sort by highest liquidity, if the path is shorter, replace best route.
            if (!solved) {
                // this is first solution. Mark as best
                bestRoute = currentRoute;
                solved = true;
            }
            else {
                if (currentRoute.length < bestRoute.length) {
                    bestRoute = currentRoute
                }
                // else this is not a better solution
            }
        } else {
            // need to search more
            search(graph, currentRoute, tokenA, tokenB)
        }

        // try diff route
        currentRoute.pop()
    }
}
