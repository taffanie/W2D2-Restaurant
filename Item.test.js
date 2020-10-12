const { expect } = require("@jest/globals");
const Item = require("./Item");

const item1 = new Item("cake", "2.50")

describe('Item', () => {
    test('should have a name', () => {
        expect(item1.name).toBe("cake")
    });
    test('should have a price', () => {
        expect(item1.price).toBe("2.50")
    });
});