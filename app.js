require('dotenv').config()
require('./db')

const express = require('express')
const app = express()

const config = require('./config')
config(app)

module.exports = app