/*const UserRoutes = require('express').Router()
const { isAuth } = require('../../utils/middlewares/auth')
const { postNewUser, loginUser, logoutUser, getUser } = require('./user.controller')

UserRoutes.post('/', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAuth], logoutUser)
UserRoutes.get('/:id', [isAuth], getUser)

module.exports = UserRoutes*/