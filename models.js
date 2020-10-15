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
        if(data.id){
            return Promise.resolve(this)
        } else {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO restaurants(name, imageUrl) VALUES(?,?);', [this.name, this.imageUrl], function(err) {
                    this.id = this.lastID
                    resolve(this)
                })
            })
        }
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
        if(data.id){
            return Promise.resolve(this)
        } else {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO menus(title, restaurant_id) VALUES(?,?);', [this.title, this.lastID], function(err){
                    this.id = this.lastID
                    resolve(this)
                })
            })
        }
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
        this.title = data.title 
        this.price = data.price
        if(data.id){
            return Promise.resolve(this)
        } else {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO items(name, price, menu_id) VALUES(?,?,?);', [this.name, this.price, this.lastID], function(err){
                    this.id = this.lastID
                    resolve(this)
                })
            })
        }
    }
}


module.exports = { Restaurant, Menu, Item }