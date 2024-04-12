const router = require('express').Router()

const authRoutes = require('./auth.routes')
const restaurantsRoutes = require('./restaurants.routes')
const userRoutes = require('./user.routes')

router.use('/auth', authRoutes)
router.use('/restaurants', restaurantsRoutes)
router.use('/user', userRoutes)

module.exports = router