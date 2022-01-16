const PlataRoutes = require('express').Router()
const { isAuth } = require('../../utils/middlewares/auth')
const upload = require('../../utils/middlewares/file')
const { postNewPlata, getAllPlata, getPlata, patchPlata, deletePlata } = require('./plata.controller')


PlataRoutes.get('/', getAllPlata)
PlataRoutes.get('/:id', getPlata)
PlataRoutes.post('/', upload.single('img'), postNewPlata)
PlataRoutes.patch('/:id', upload.single('img'), patchPlata)
PlataRoutes.delete('/:id', upload.single('img'), deletePlata)

module.exports = PlataRoutes