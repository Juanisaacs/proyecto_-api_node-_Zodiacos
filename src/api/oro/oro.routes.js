const OroRoutes = require('express').Router()
const { isAuth } = require('../../utils/middlewares/auth')
const upload = require('../../utils/middlewares/file')
const { postNewOro, getAllOro, getOro, patchOro, deleteOro } = require('./oro.controller')


OroRoutes.get('/', getAllOro)
OroRoutes.get('/:id', getOro)
OroRoutes.post('/', upload.single('img'), postNewOro)
OroRoutes.patch('/:id',  upload.single('img'), patchOro)
OroRoutes.delete('/:id', upload.single('img'), deleteOro)

module.exports = OroRoutes
