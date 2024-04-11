const User = require('../models/user.model')
const { createPassword } = require('../utils/auth')
const jwt = require('jsonwebtoken')
const { Types } = require('mongoose')

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

        res.status(200).json({ message: 'User has been created', user: newUser })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res) => {
    res.status(200).json({
        message: 'User has been logged',
        token: jwt.sign(
            { user: req.user._id }, 
            process.env.PASSPORT_SECRET, 
            { expiresIn: '3d' })
    })
}

const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id)

    res.status(200).json({ message: 'User has been verified', user })
}

const editUser = async (req, res, next) => {
    try {
        const { _id: userId } = req.user
        
        if(!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user id' })
        }

        const { email, password } = req.body

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { email, password }, 
            { new: true }
        )

        res.status(200).json({ message:'User has been updated', user: updatedUser })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    signup,
    login,
    getProfile,
    editUser
}