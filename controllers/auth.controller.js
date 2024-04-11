const User = require('../models/user.model')
const { createPassword } = require('../utils/auth')
const jwt = require('jsonwebtoken')
const { Types } = require('mongoose')

const signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body

        if(!email || !username || !password) {
            res.status(400).json({ error: true, message: 'All fields are required' })
        }

        const user = await User.findOne({ email })
        if(user) {
            res.status(400).json({ error: true, message: 'This email is already registered.' })
        }

        const passwordCrypt = createPassword(password)

        const newUser = await User.create({
            email,
            username,
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

        const { email, username } = req.body

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { email, username }, 
            { new: true }
        )

        if(!updatedUser) {
            res.status(400).json({ message: 'User not found' })
        }

        res.status(200).json({ message:'User has been updated', user: updatedUser })
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { _id: userId } = req.user
        
        if(!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user id' })
        }

        const deletedUser = User.findByIdAndDelete(userId)

        if(!deletedUser) {
            res.status(400).json({ message: 'User not found' })
        }

        res.status(200).json({ message: 'User has been deleted' })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    signup,
    login,
    getProfile,
    editUser,
    deleteUser
}