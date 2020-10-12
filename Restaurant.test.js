const Restaurant = require('./Restaurant');

const restaurant1 = new Restaurant("The Clove Club", "image", "London")

describe('Restaurant', () => {
    test('should have a name', () => {
        expect(restaurant1.name).toBe("The Clove Club")
    });
    test('should have an image', () => {
        expect(restaurant1.imageUrl).toBe("image")
    });
    test('should have a city', () => {
        expect(restaurant1.city).toBe("London")
    });
});