import { quickClient } from "../apollo/client"
import { AdjacencyMap, getPairGraphWithLiquidityWeights } from "../util/getAllPairs"


// Goals:
// Shortest Path from A to B
// With Highest liquidity

const currentRoute: string[] = []
let bestRoute: string[] = []
let solved = false

export const getShortestPathWithHighestLiquidity = async (startToken: string, endToken: string, USDThreshold = 500000): Promise<string[]> => {
    const graph = await getPairGraphWithLiquidityWeights(quickClient, USDThreshold)

    // DFS
    
    // init routes
    currentRoute.push(startToken)

    search(graph, currentRoute, endToken)

    return bestRoute
}

const search = (graph: AdjacencyMap<number>, currentRoute: string[], tokenB: string) => {
    const head = currentRoute[currentRoute.length-1]
    const getAllNextPathsLiquidityDesc = (graph: AdjacencyMap<number>, tokenA: string) => {
        const edgeMap = graph[tokenA];
        const edgeEntries = Object.entries(edgeMap)
        const edgeEntriesLiquidityDesc = edgeEntries.sort((a, b) => {
            const [ symbolA, liquidityA ] = a
            const [ symbolB, liquidityB ] = b
            return liquidityB - liquidityA
        })
        return edgeEntriesLiquidityDesc
    }

    const edgeEntriesLiquidityDesc = getAllNextPathsLiquidityDesc(graph, head)

    for (const entry of edgeEntriesLiquidityDesc) {
        const [ symbol, liquidity ] = entry
        if (currentRoute.find(sym => sym === symbol)) {
            // skip. Don't want to route through same token twice. Should replace this with a visited map tbh. Will try without first to see if this optimization is enough.
            continue
        }
        if (solved && currentRoute.length >= bestRoute.length) {
            // don't bother if the path is already longer then the current best sol
            continue
        }
        currentRoute.push(symbol)
        if (symbol === tokenB) {
            // solution is found. Since we always sort by highest liquidity, if the path is shorter, replace best route.
            if (!solved) {
                // this is first solution. Mark as best
                bestRoute = [...currentRoute];
                solved = true;
            }
            else {
                if (currentRoute.length < bestRoute.length) {
                    bestRoute = [...currentRoute]
                }
                // else this is not a better solution
            }
        } else {
            // need to search more
            search(graph, currentRoute, tokenB)
        }

        // try diff route
        currentRoute.pop()
    }
}
