const router = require('express').Router()
const passport = require('passport')
const { signup, login, getProfile, editUser, deleteUser } = require('../controllers/auth.controller')

router.all('/fail', (req, res) => {
    res.status(401).json({ message: 'Unauthorized' })
})

router.post('/signup', signup)
router.post('/login', passport.authenticate('login', { session: false, failureRedirect: '/api/user/fail' }), login)
router.post('/getProfile', passport.authenticate('jwt', { session: false }), getProfile)
router.put('/edit', passport.authenticate('jwt', { session: false }), editUser)
router.delete('/delete', passport.authenticate('jwt', { session: false }), deleteUser)

module.exports = router