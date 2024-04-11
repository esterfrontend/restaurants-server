const passport = require('passport')

const passportInitialize = (app) => {
    app.use(passport.initialize())
}

module.exports = passportInitialize