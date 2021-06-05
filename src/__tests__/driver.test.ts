import { getShortestPathWithHighestLiquidity } from "../driver/driver";

// test('driver', () => {
//     const dai = "DAI"
//     const bifi = "BIFI"
//     await getShortestPathWithHighestLiquidity(dai, bifi)
//     expect(true).toBe(true)
// });

const run = async () => {
    const start = "FXS"
    const end = "VISION"
    const path = await getShortestPathWithHighestLiquidity(start, end, 100000)
    path.forEach(symbol => {
        console.log(symbol)
    })
}

run()

export {}