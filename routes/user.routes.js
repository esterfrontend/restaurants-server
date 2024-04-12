const router = require('express').Router()
const passport = require('passport')
const { getFavouriteRestaurants, likeRestaurant, dislikeRestaurant } = require('../controllers/user.controller')

router.post('/getFavouriteRestaurants', passport.authenticate('jwt', { session: false }), getFavouriteRestaurants)
router.put('/likeRestaurant/:restaurant_id', passport.authenticate('jwt', { session: false }), likeRestaurant)
router.put('/dislikeRestaurant/:restaurant_id', passport.authenticate('jwt', { session: false }), dislikeRestaurant)

module.exports = router