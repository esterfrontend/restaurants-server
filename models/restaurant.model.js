const { Schema, model } = require('mongoose')

const restaurantSchema = new Schema(
    {
        name: {
            type: String, 
            required: [true, 'Username is required']
        },
        neighborhood: {
            type: String
        },
        photograph: {
            type: String
        },
        address: {
            type: String
        },
        latlng: {
            lat: {
                type: Number
            },
            lng: {
                type: Number
            }
        },
        image: {
            type: String
        },
        cuisin_type: {
            type: String
        },
        description: {
            type: String
        },
        reviews: [
            {
                name: {
                    type: String
                },
                date: {
                    type: Date
                },
                rating: {
                    type: Number
                },
                comments: {
                    type: String
                }
            }
        ],
        operating_hours: {
            Monday: {
                type: String
            },
            Tuesday: {
                type: String
            },
            Wednesday: {
                type: String
            },
            Thursday: {
                type: String
            },
            Friday: {
                type: String
            },
            Saturday: {
                type: String
            },
            Sunday: {
                type: String
            }
        }
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

const Restaurant = model('Restaurant', restaurantSchema)

module.exports = Restaurant