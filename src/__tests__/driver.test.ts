import { getShortestPathWithHighestLiquidity } from "../driver/driver";

// test('driver', () => {
//     const dai = "DAI"
//     const bifi = "BIFI"
//     await getShortestPathWithHighestLiquidity(dai, bifi)
//     expect(true).toBe(true)
// });

const run = async () => {
    const start = "FXS"
    const end = "LINK"
    const sols = await getShortestPathWithHighestLiquidity(start, end, 100000)

    if (sols.length === 0) {
        console.log("No Solution. Try raising threshold")
        return
    }

    console.log("Solutions in desc order of total liquidity: \n")
    sols.forEach((solution) => {
        console.log("Solution:")
        solution[0].forEach(symbol => {
            console.log(symbol)
        })
        // Note that this really isn't a total, as its double counting the liquidity across pairs, but its ok for this algo.
        console.log(`Total liquidity in USD: ${solution[1]}\n`)
    })
}

run()

export {}