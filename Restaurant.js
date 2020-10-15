const Rating = require('./Rating')

// ----- Before ORM -----

class Restaurant {
    constructor(name, imageUrl, city){
        this.name = name 
        this.imageUrl = imageUrl 
        this.city = city 
        this.menus = []
        this.ratings = []
        this.avgRating = 0
    }
    addMenu(menuObj){
        this.menus.push(menuObj)
    }
    addRating(rating){
        this.ratings.push(rating)
    }
    calcAvgRating(ratingsArr){
        const ratings = ratingsArr.map(ratingObj => {
            return ratingObj.starRating
        }); // returns an array of just the rating numbers 
        const avg = ratings.reduce((a,b) => a + b, 0) / ratings.length
        return this.avgRating += avg 
    }
}

// ----- Testing -----

// const restaurant1 = new Restaurant("The Clove Club", "image", "London")
// const rating1 = new Rating(5)
// const rating2 = new Rating(3)

// restaurant1.addRating(rating1)
// restaurant1.addRating(rating2)

// restaurant1.calcAvgRating(restaurant1.ratings)

// // console.log(restaurant1.ratings)
// console.log(restaurant1.avgRating) // 4

module.exports = Restaurant