import { quickClient } from "../apollo/client"
import { AdjacencyMap, getPairGraphWithLiquidityWeights } from "../util/getAllPairs"


// Goals:
// Shortest Path from A to B
// With Highest liquidity

const currentRoute: string[] = []
let currentLiquiditySum = 0

const solutions: [string[], number][] = []

export const getShortestPathWithHighestLiquidity = async (startToken: string, endToken: string, USDThreshold = 500000)/*: Promise<string[]>*/ => {
    const graph = await getPairGraphWithLiquidityWeights(quickClient, USDThreshold)

    // init routes
    currentRoute.push(startToken)
    
    // DFS
    search(graph, currentRoute, endToken)

    const sortedSols = solutions.sort((a, b) => {
        return a[0].length - b[0].length
    })

    const filteredSols = sortedSols.filter(sol => {
        return sol[0].length <= sortedSols[0][0].length
    })

    const rankedSols = filteredSols.sort((a, b) => {
        return b[1] - a[1]
    })

    return rankedSols
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
        const tempSols = solutions.sort((a, b) => {
            return a[0].length - b[0].length
        })
        if (tempSols.length > 0 && currentRoute.length >= tempSols[0][0].length) {
            // don't bother if the path is going to be longer then the current best sol
            continue
        }
        currentRoute.push(symbol)
        currentLiquiditySum += liquidity
        if (symbol === tokenB) {
            // solution is found. Since we always sort by highest liquidity, if the path is shorter, replace best route.
            
            solutions.push([[...currentRoute], currentLiquiditySum])
                // else this is not a better solution
        } else {
            // need to search more
            search(graph, currentRoute, tokenB)
        }

        // backtrack and try diff route
        currentRoute.pop()
        currentLiquiditySum -= liquidity
    }
}
