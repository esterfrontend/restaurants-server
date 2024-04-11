const router = require('express').Router()
const { signup, login } = require('../controllers/user.controller')
const passport = require('passport')

router.all('/fail', (req, res) => {
    res.status(401).json({ message: 'Unauthorized' })
})

router.post('/signup', signup)
router.post('/login', passport.authenticate('login', { session: false, failureRedirect: '/api/auth/fail' }), login)

module.exports = router