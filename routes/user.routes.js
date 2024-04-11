const router = require('express').Router()
const passport = require('passport')
const { signup, login, getProfile } = require('../controllers/user.controller')

router.all('/fail', (req, res) => {
    res.status(401).json({ message: 'Unauthorized' })
})

router.post('/signup', signup)
router.post('/login', passport.authenticate('login', { session: false, failureRedirect: '/api/user/fail' }), login)
router.post('/getProfile', passport.authenticate('jwt', { session: false }), getProfile)

module.exports = router