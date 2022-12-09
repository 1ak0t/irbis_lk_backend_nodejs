export const generateRandomValue = (min, max, numAfterDigit = 0) => +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
export const getRandomItems = (items) => {
    const startPosition = generateRandomValue(0, items.length - 1);
    const endPosition = startPosition + generateRandomValue(startPosition, items.length);
    return items.slice(startPosition, endPosition);
};
export const getRandomItem = (items) => items[generateRandomValue(0, items.length - 1)];
//# sourceMappingURL=rundom.js.map