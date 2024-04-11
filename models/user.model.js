const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: [true, 'Email is required'],
            match: [
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                'Invalid email',
            ]
        },
        password: {
            salt: {
                type: String, 
                required: true
            },
            hash: {
                type: String, 
                required: true
            }
        },
        favouriteRestaurants: [{
            type: String
        }]
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            virtual: true, 
            transform: function (doc, ret) {
                delete ret.password
                return ret
            }
        }
    }
)

const User = model('User', userSchema)

module.exports = User