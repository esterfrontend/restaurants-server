const router = require('express').Router()
const { 
    getAllRestaurants, 
    getOneRestaurant, 
    createRestaurant, 
    editRestaurant, 
    deleteRestaurant 
} = require('../controllers/restaurants.controller')

router.get('/getAll', getAllRestaurants)
router.get('/getOne/:restaurant_id', getOneRestaurant)
router.post('/create', createRestaurant)
router.put('/edit/:restaurant_id', editRestaurant)
router.delete('/delete/:restaurant_id', deleteRestaurant)

module.exports = router