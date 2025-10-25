
async function getRandomIndex(max: number): Promise<number> {
    return Math.floor(Math.random() * max);
}

export { getRandomIndex }