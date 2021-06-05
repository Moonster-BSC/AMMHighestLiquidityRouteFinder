import { getShortestPathWithHighestLiquidity } from "../driver/driver";

// test('driver', () => {
//     const dai = "DAI"
//     const bifi = "BIFI"
//     await getShortestPathWithHighestLiquidity(dai, bifi)
//     expect(true).toBe(true)
// });

const run = async () => {
    const start = "$DG"
    const end = "VISION"
    const sols = await getShortestPathWithHighestLiquidity(start, end, 100000)

    console.log("Solutions in desc order of total liquidity: \n")
    sols.forEach((solution) => {
        console.log("Solution:")
        solution[0].forEach(symbol => {
            console.log(symbol)
        })
        console.log(`Total liquidity in USD: ${solution[1]}\n`)
    })
}

run()

export {}