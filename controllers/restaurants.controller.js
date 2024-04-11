const Restaurant = require('../models/restaurant.model')
const { Types } = require('mongoose')

const getAllRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find().sort({ createdAt: -1 }).lean()

        res.status(200).json(restaurants)
    } catch (error) {
        next(error)
    }
}

const getOneRestaurant = async (req, res, next) => {
    try {
        const { restaurant_id } = req.params 

        if(!Types.ObjectId.isValid(restaurant_id)) {
            return res.status(400).json({ error: true, message: 'Invalid restaurant id' })
        }

        const restaurant = await Restaurant.findById(restaurant_id).lean()

        if(!restaurant) {
            return res.status(400).json({ error: true, message: 'Restaurant not found' })
        }

        res.status(200).json(restaurant)
    } catch (error) {
        next(error)
    }
}

const createRestaurant = async (req, res, next) => {
    try {
        const { 
            name,
            address,
            image,
            description
        } = req.body

        if(!name || !address ) {
            res.status(400).json({ error: true, message: 'Please, fill in the fields' })
        }

        const newRestaurant = await Restaurant.create({
            name,
            address,
            image,
            description
        })

        res.status(200).json({ message: 'Restaurant has been created', restaurant: newRestaurant })
    } catch (error) {
        next(error)
    }
}

const editRestaurant = async (req, res, next) => {
    try {
        const { restaurant_id } = req.params 

        if(!Types.ObjectId.isValid(restaurant_id)) {
            return res.status(400).json({ error: true, message: 'Invalid restaurant id' })
        }

        const { 
            name,
            address,
            image,
            description
        } = req.body

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restaurant_id,
            {
                name,
                description
            },
            { new: true }
        ).lean()

        if(!updatedRestaurant) {
            return res.status(404).json({ error: true, message: 'Restaurant not found' })
        }

        res.status(200).json({ message:'Restaurant has been updated', restaurant: updatedRestaurant })
    } catch (error) {
        next(error)
    }
}

const deleteRestaurant = async (req, res) => {
    try {
        const { restaurant_id } = req.params 

        if(!Types.ObjectId.isValid(restaurant_id)) {
            return res.status(400).json({ error: true, message: 'Invalid restaurant id' })
        }

        const deletedRestaurant = Restaurant.findByIdAndDelete(restaurant_id)

        if(!deletedRestaurant) {
            res.status(400).json({ message: 'Restaurant not found' })
        }

        res.status(200).json({ message: 'Restaurant has been deleted' })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllRestaurants, 
    getOneRestaurant, 
    createRestaurant, 
    editRestaurant, 
    deleteRestaurant 
}