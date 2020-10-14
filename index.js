const db = require('./db')
const restaurants = require('./restaurants.json')

// ----- Recursive functions -----

// ----- Insert restaurants function -----

function insertRestaurants(restaurants, callback) {
    if (restaurants.length === 0) return callback()
    const restaurant = restaurants.pop()
    db.run('INSERT INTO restaurants(name, imageUrl) VALUES(?,?);', [restaurant.name, restaurant.image], function(err) {
            const restaurant_id = this.lastID // retrieves the id of the last entry added to database 
            insertMenus(restaurant.menus, restaurant_id, function() {
                insertRestaurants(restaurants, callback)
            }) 
        }
    )
};

// ----- Insert menus function -----

function insertMenus(menus, restaurant, callback) {
    if (menus.length === 0) return callback()
    const menu = menus.pop()
    db.run('INSERT INTO menus(title, restaurant_id) VALUES(?,?);', [menu.title, restaurant], function(err) {
        const menu_id = this.lastID
        insertItems(menu.items, menu_id, function() {
            insertMenus(menus, restaurant, callback)
        })
    })
};

// ----- Insert items function -----

function insertItems(items, menu, callback) {
    if (items.length === 0) return callback()
    const item = items.pop()
    db.run('INSERT INTO items(name, price, menu_id) VALUES(?,?,?);', [item.name, item.price, menu], function(err) {
        insertItems(items, menu, callback)
    })
};

// ----- Loader() function which calls the insertRestaurants() function with 2 arguments -----

function loader(callback) {
    insertRestaurants(restaurants, callback)
};

module.exports = loader