class Menu {
    constructor(title, icon){
        this.title = title
        this.icon = icon 
        this.items = []
    }
    addToRestaurant(restaurantObj){
        restaurantObj.addMenu(this) // "this" refers to the current menu object, addMenu() is a function in the Restaurant class 
    }
    addItem(item){
        this.items.push(item)
    }
}

module.exports = Menu 