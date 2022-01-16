const Oro = require('./oro.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../utils/middlewares/deleteFile')


const postNewOro = async (req, res, next) => {
    try {
        const newOro = new Oro()
        newOro.name = req.body.name
        newOro.tipo = req.body.tipo
        newOro.ataque= req.body.ataque
        if (req.file) {
            newOro.img = req.file.path
        }
        const oroDB = await newOro.save()
        return res.status(201).json(oroDB)
    } catch (error) {
        return next(setError(500, 'Oro not saved'))
    }
}

const getAllOro = async (req, res, next) => {
    try {
        const oroDB = await Oro.find()
        res.status(200).json(oroDB)
    } catch (error) {
        return next(setError(500, 'Oro failed server'))
    }
}

const getOro = async (req, res, next) => {
    try {
        const { id } = req.params
        const oroDB = await Oro.findById(id)
        if (!oroDB) {
            return next(setError(404, 'Oro not found'))
        }
        return res.status(200).json(oroDB)
    } catch (error) {
        return next(setError(500, 'Oro server error'))
    }
}

const patchOro = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchOro = new Oro(req.body)
        patchOro._id = id
        if (req.file) {
            patchOro.img = req.file.path
        }
        const oroDB = await Oro.findByIdAndUpdate(id, patchOro)
        if (!oroDB) {
            return next(setError(404, ' Oro not found'))
        }
        if (oroDB.img) deleteFile(oroDB.img)
        return res.status(200).json({ new: patchOro, old: oroDB })
    } catch (error) {
        return next(setError(500, 'Oro Patch server error'))
    }
}

const deleteOro = async (req, res, next) => {
    try {
        const { id } = req.params
        const oroDB = await Oro.findByIdAndDelete(id)
        if (!oroDB) {
            return next(setError(404, 'Oro not found'))
        }
        if (oroDB.img) deleteFile(oroDB.img)
        return res.status(200).json(oroDB)
    } catch (error) {
        return next(setError(500, 'Oro removed server error'))
    }
}

module.exports = {
    postNewOro,
    getAllOro,
    getOro,
    patchOro,
   deleteOro,
}
