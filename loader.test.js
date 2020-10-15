const loader = require('./index')
const db = require('./db')
const { Restaurant, Menu, Item } = require('./models')

// ----- CREATE TABLES ----- 

beforeAll(done => {
    db.exec(`
        CREATE TABLE restaurants(id INTEGER PRIMARY KEY, name TEXT, imageUrl TEXT);
        CREATE TABLE menus(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER); 
        CREATE TABLE items(id INTEGER PRIMARY KEY, name TEXT, price FLOAT, menu_id INTEGER);
    `, loader.bind(null, done))
});

// ----- START ORM TESTS -----

// --- Restaurants ---

describe('Restaurants', () => {
    test('when a restaurant is created it is stored to the database', async () => {
        const restaurant = await new Restaurant({"name":"Fresh & Wild", "imageUrl": "image.url"})
        expect(restaurant.id).toBe(9)
    });
    test('when you fetch a restaurant from the database you are returned an instance of the Restaurant class', async () => {
        const restaurants = await Restaurant.findAll()
        // console.log(restaurants)
        expect(Array.isArray(restaurants)).toBeTruthy()
        expect(restaurants[0] instanceof Restaurant).toBeTruthy()
        // console.log(restaurants[0])
        expect(restaurants[8].name).toBe("Fresh & Wild")
        expect(restaurants[8].id).toBe(9)
    });
});

// --- Menus ---

describe('Menu', () => {
    test('when a menu is created it is stored to the database', async () => {
        const menu = await new Menu({"title": "Brunch Menu"}) // data: {"title": ...}
        expect(menu.id).toBe(19)
    });
    test('when you fetch a menu from the database you are returned an instance of the Menu class', async () => {
        const menus = await Menu.findAll()
        expect(Array.isArray(menus)).toBeTruthy()
        expect(menus[18] instanceof Menu).toBeTruthy()
        expect(menus[18].id).toBe(19)
    });
});

// --- Items ---

describe('Item', () => {
    test('when an item is created it is stored to the database', async () => {
        const item = await new Item({"name": "Acai Bowl", "price": 8.50}) // data: {"name": ...}
        console.log(item)
        expect(item.id).toBe(85)
    });
    test('when you fetch an item from the database you are returned an instance of the Item class', async () => {
        const items = await Item.findAll()
        expect(Array.isArray(items)).toBeTruthy()
        expect(items[84] instanceof Item).toBeTruthy()
        expect(items[84].id).toBe(85)
    });
});

// ----- START SQL TESTS -----

describe.skip('loader', () => {
    test('should add restaurants to the database', (done) => {
        loader(() => {
            db.get('SELECT COUNT(id) AS total FROM restaurants;', function(err, row){
                expect(row.total).toBe(8)
                done()
            })
        });
    });
    test('should add menus to the database', (done) => {
        loader(() => {
            db.get('SELECT COUNT(id) AS total FROM menus;', function(err, row){
                expect(row.total).toBe(18)
                done()
            })
        })
    });
    test('should add items to the database', (done) => {
        loader(() => {
            db.get('SELECT COUNT(id) AS total FROM items;', function(err, row){
                expect(row.total).toBe(84)
                done()
            })
        })
    });
});

// ----- MORE COMPLEX SQL TESTS ----- 

describe.skip('loader more complex', () => {
    test('should add restaurants accurately', (done) => {
        loader(() => {
            db.all('SELECT * FROM restaurants;', function(err, row) {
                // console.log(row[0])
                expect(row[0].name).toBe("Impact crator")
                done()
            })
        })
    });
    test('should add menus accurately', (done) => {
        loader(() => {
            db.all('SELECT * FROM menus;', function(err, row) {
                // console.log(row[0])
                expect(row[0].title).toBe("Brunch Menu")
                db.get('SELECT COUNT(id) AS total from menus;', function(err, count){
                    expect(count.total).toBe(18)
                    done()
                })
            })
        })
    });
});
