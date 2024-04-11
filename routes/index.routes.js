const router = require('express').Router()

const authRoutes = require('./auth.routes')
const restaurantsRoutes = require('./restaurants.routes')

router.use('/auth', authRoutes)
router.use('/restaurants', restaurantsRoutes)

module.exports = router