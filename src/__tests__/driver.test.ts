import { getShortestPathWithHighestLiquidity } from "../driver/driver";

// test('driver', () => {
//     const dai = "DAI"
//     const bifi = "BIFI"
//     await getShortestPathWithHighestLiquidity(dai, bifi)
//     expect(true).toBe(true)
// });

const run = async () => {
    const dai = "FRAX"
    const bifi = "BIFI"
    const path = await getShortestPathWithHighestLiquidity(dai, bifi)
    path.forEach(symbol => {
        console.log(symbol)
    })
}

run()

export {}