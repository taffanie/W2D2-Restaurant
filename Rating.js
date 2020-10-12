class Rating {
    constructor(starRating){
        this.starRating = starRating
    }
    addRatingToRestaurant(restaurantObj){
        restaurantObj.addRating(this)
    }
}

module.exports = Rating