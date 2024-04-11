const passport = require('passport')

require('./serializers')
require('./localStrategy')

const passportInitialize = (app) => {
    app.use(passport.initialize())
}

module.exports = passportInitialize