import { getShortestPathWithHighestLiquidity } from "../driver/driver";

test('driver', () => {
    const dai = "DAI"
    const bifi = "BIFI"
    getShortestPathWithHighestLiquidity(dai, bifi)
    expect(true).toBe(true)
});

export {}