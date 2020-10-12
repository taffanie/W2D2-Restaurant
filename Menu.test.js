const { expect } = require("@jest/globals");
const Menu = require("./Menu");

const menu1 = new Menu("dessert", "🍰")

describe('Menu', () => {
    test('should have a title', () => {
        expect(menu1.title).toBe("dessert")
    });
    test('should have an icon', () => {
        expect(menu1.icon).toBe("🍰")
    });
});