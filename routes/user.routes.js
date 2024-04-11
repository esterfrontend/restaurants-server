const router = require('express').Router()
const { signup } = require('../controllers/user.controller')

router.all('/fail', (req, res) => {
    res.status(401).json({ message: 'Unauthorized' })
})

router.post('/signup', signup)

module.exports = router