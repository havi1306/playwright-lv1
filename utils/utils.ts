import { faker } from '@faker-js/faker';

async function getRandomIndex(max: number): Promise<number> {
    return Math.floor(Math.random() * max);
}

async function randomText(length: number): Promise<string> {
    return faker.string.alphanumeric({ length });
}

async function randomInt(min: number, max: number): Promise<number> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomIndex, randomText, randomInt }