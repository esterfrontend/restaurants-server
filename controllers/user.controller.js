const User = require('../models/user.model')
const { Types } = require('mongoose')


const getFavouriteRestaurants = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('favouriteRestaurants').populate('favouriteRestaurants').lean()

        res.status(200).json(user.favouriteRestaurants)
    } catch (error) {
        next(error)
    }
}

const likeRestaurant = async (req, res, next) => {
    try {
        const { restaurant_id } = req.params

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { favouriteRestaurants: restaurant_id } },
            { new: true }
        )

        res.status(200).json({ message: 'Restaurant has been added to favourite restaurants', favouriteRestaurants: updatedUser.favouriteRestaurants })
    } catch (error) {
        next(error)
    }
}

const dislikeRestaurant = async (req, res, next) => {
    try {
        const { restaurant_id } = req.params

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { favouriteRestaurants: restaurant_id } },
            { new: true }
        )

        res.status(200).json({ message: 'Restaurant has been removed from favourite restaurants', favouriteRestaurants: updatedUser.favouriteRestaurants })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getFavouriteRestaurants, 
    likeRestaurant, 
    dislikeRestaurant
}