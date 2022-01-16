const BronceRoutes = require('express').Router()
const { isAuth } = require('../../utils/middlewares/auth')
const upload = require('../../utils/middlewares/file')
const { postNewBronce, getAllBronce, getBronce, patchBronce, deleteBronce } = require('./bronce.controller')


BronceRoutes.get('/', getAllBronce)
BronceRoutes.get('/:id', getBronce)
BronceRoutes.post('/', upload.single('img'), postNewBronce)
BronceRoutes.patch('/:id', upload.single('img'), patchBronce)
BronceRoutes.delete('/:id', deleteBronce)

module.exports = BronceRoutes