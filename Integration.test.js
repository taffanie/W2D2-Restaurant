const Restaurant = require('./Restaurant')
const Menu = require("./Menu")
const Item = require("./Item")
const Rating = require("./Rating")
const { expect } = require('@jest/globals')

// Create a restaurant 
// Create a menu & associate it with a Restaurant 
// Create an item & associate it with a Menu 

const restaurant1 = new Restaurant("The Clove Club", "image", "London")
const menu1 = new Menu("dessert", "🍰")
const item1 = new Item("cake", "2.50")

menu1.addToRestaurant(restaurant1)
item1.addToMenu(menu1)

describe('Restaurant', () => {
    test('menu should be associated with a restaurant', () => {
        expect(restaurant1.menus[0].title).toBe("dessert")
    });
    test('item should be associated with a menu', () => {
        expect(menu1.items[0].name).toBe("cake")
    });
});

// Create a rating & associate it with a Restaurant
// Calculate the average rating of a Restaurant

const rating1 = new Rating(5)
const rating2 = new Rating(3)

rating1.addRatingToRestaurant(restaurant1)
rating2.addRatingToRestaurant(restaurant1)

restaurant1.calcAvgRating(restaurant1.ratings)

describe('Rating', () => {
    test('rating should be associated with a restaurant', () => {
        expect(restaurant1.ratings[0].starRating).toBe(5)
    });
    test('can calculate the average rating of a restaurant', () => {
        expect(restaurant1.avgRating).toBe(4)
    });
});