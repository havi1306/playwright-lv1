
async function getRandomIndex(max: number): Promise<number> {
    return Math.floor(Math.random() * max);
}

async function randomText(length: number): Promise<string> {
    return Math.random().toString(36).substring(2, 2 + length);
}

async function randomInt(min: number, max: number): Promise<number> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomIndex, randomText, randomInt }