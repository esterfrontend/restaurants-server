const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const passport = require('../passport')
const cors = require("cors")

const LOCAL_FRONT = "http://localhost:3001"
const FRONTEND_URL = process.env.FRONTEND_ORIGIN

const corsOptions = {
    origin: function (origin, callback) {
        if ([FRONTEND_URL, LOCAL_FRONT].includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}

const config = (app) => {
    app.set('trust proxy', 1)
    app.use(cors(corsOptions))
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser());
    passport(app)
}

module.exports = config