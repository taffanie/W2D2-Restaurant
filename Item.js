class Item {
    constructor(name, price){
        this.name = name
        this.price = price
    }
    addToMenu(menuObj){
        menuObj.addItem(this)
    }
}

module.exports = Item