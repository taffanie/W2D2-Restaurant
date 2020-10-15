const db = require('./db')

// Object relational mapping i.e. ORM 

// ----- Restaurant -----

// Create an new instance of Restaurant & it will persist in the database 

class Restaurant {
    static findAll(){
        return new Promise((resolve, reject) => {
            db.all('SElECT * FROM restaurants;', async function(err, rows){
                if (err) return reject(err)
                const restaurants = await Promise.all(rows.map(row => new Restaurant(row)))
                resolve(restaurants)
            })
        })
    }
    constructor(data){ // data: {id: 1, name: 'Impact crator', imageUrl: '...'}
        this.id = data.id
        this.name = data.name
        this.imageUrl = data.imageUrl
        this.menus = []
        if(data.id){
            //console.log(this)
         return new Promise((resolve, reject) => {
                const restaurant = this;// "this" changes into a Statement when it hits db.all, therefore we must define that we are referring to the "this" from before
                db.all('SELECT * FROM menus WHERE restaurant_id=?;', [restaurant.id], async function(err, rows){
                    restaurant.menus = await Promise.all(rows.map(row => new Menu(row)))
                    resolve(restaurant)
                })
            })
            // return Promise.resolve(this)
        } else {
            return new Promise((resolve, reject) => {
                const restaurant = this;
                db.run('INSERT INTO restaurants(name, imageUrl) VALUES(?,?);', [restaurant.name, restaurant.imageUrl], function(err) {
                    restaurant.id = this.lastID // "this" here relates to the database 
                    resolve(restaurant)
                })
            })
        }
    }
    async addMenu(title){
        const menu = await new Menu({title: title, restaurant_id: this.id})
        this.menus.push(menu)
    }
}

// ----- Menu -----

class Menu {
    static findAll(){
        return new Promise((resolve, reject) => {
            db.all('SElECT * FROM menus;', async function(err, rows){
                if (err) return reject(err)
                const menus = await Promise.all(rows.map(row => new Menu(row)))
                resolve(menus) // AFTER SELECT * FROM menus; is executed, resolve(menus) i.e. await Promise.all.... etc. 
            })
        })
    }
    constructor(data){
        this.id = data.id 
        this.title = data.title 
        this.items = []
        if(data.id){
            return new Promise((resolve, reject) => {
                const menu = this;
                db.all('SELECT * FROM items WHERE menu_id=?;', [this.id], async function(err, rows){
                    menu.items = await Promise.all(rows.map(row => new Item(row)))
                    resolve(menu)
                })
            })
            // return Promise.resolve(this)
        } else {
            return new Promise((resolve, reject) => {
                const menu = this;
                db.run('INSERT INTO menus(title, restaurant_id) VALUES(?,?);', [menu.title, menu.restaurant_id], function(err){
                    menu.id = this.lastID
                    resolve(menu)
                })
            })
        }
    }
    async addItem(name, price){
        const item = await new Item({name: name, price: price, menu_id: this.id})
        this.items.push(item)
    }
}

// ----- Item -----

class Item {
    static findAll(){
        return new Promise((resolve, reject) => {
            db.all('SElECT * FROM items;', async function(err, rows){
                if (err) return reject(err)
                const items = await Promise.all(rows.map(row => new Item(row)))
                resolve(items) // AFTER SELECT * FROM items; is executed, resolve(menus) i.e. await Promise.all.... etc. 
            })
        })
    }
    constructor(data){
        this.id = data.id 
        this.name = data.name
        this.price = data.price
        if(data.id){
            return Promise.resolve(this)
        } else {
            return new Promise((resolve, reject) => {
                const item = this;
                db.run('INSERT INTO items(name, price, menu_id) VALUES(?,?,?);', [item.name, item.price, item.menu_id], function(err){
                    item.id = this.lastID
                    resolve(item)
                })
            })
        }
    }
}


module.exports = { Restaurant, Menu, Item }