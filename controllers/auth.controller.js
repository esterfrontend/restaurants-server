const User = require('../models/user.model')
const { createPassword } = require('../utils/auth')

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if(user) {
            res.status(400).json({ error: true, message: 'This email is already registered.' })
        }

        const passwordCrypt = createPassword(password)

        const newUser = await User.create({
            email,
            password: passwordCrypt
        })

        res.status(200).json({ response: newUser })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signup
}