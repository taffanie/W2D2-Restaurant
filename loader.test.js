const loader = require('./index')
const db = require('./db')

// ----- CREATE TABLES ----- 

beforeAll(done => {
    db.exec(`
        CREATE TABLE restaurants(id INTEGER PRIMARY KEY, name TEXT, imageUrl TEXT);
        CREATE TABLE menus(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER); 
        CREATE TABLE items(id INTEGER PRIMARY KEY, name TEXT, price FLOAT, menu_id INTEGER);
    `, loader.bind(null, done))
});

// ----- START TESTS -----

describe('loader', () => {
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
                // expect(row[0].title).toBe("Grill")
                expect(row.total).toBe(18)
                done()
            })
        })
    });
    test('should add items to the database', (done) => {
        loader(() => {
            db.get('SELECT COUNT(id) AS total FROM items;', function(err, row){
                // expect(row[0].name).toBe("Houmous Shawarma Lamb")
                expect(row.total).toBe(84)
                done()
            })
        })
    });
});

// ----- MORE COMPLEX TESTS ----- 

describe('loader more complex', () => {
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
