const Bronce = require('./bronce.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../utils/middlewares/deleteFile')


const postNewBronce = async (req, res, next) => {
    try {
        const newBronce = new Bronce()
        newBronce.name = req.body.name
        newBronce.tipo = req.body.tipo
        newBronce.ataque= req.body.ataque
        if (req.file) {
            newBronce.img = req.file.path
        }
        const bronceDB = await newBronce.save()
        return res.status(201).json(bronceDB)
    } catch (error) {
        return next(setError(500, 'Bronce not saved'))
    }
}

const getAllBronce = async (req, res, next) => {
    try {
        const bronceDB = await Bronce.find()
        res.status(200).json(bronceDB)
    } catch (error) {
        return next(setError(500, 'Bronce failed server'))
    }
}

const getBronce = async (req, res, next) => {
    try {
        const { id } = req.params
        const bronceDB = await Bronce.findById(id)
        if (!bronceDB) {
            return next(setError(404, 'bronce not found'))
        }
        return res.status(200).json(bronceDB)
    } catch (error) {
        return next(setError(500, 'Bronce server error'))
    }
}

const patchBronce = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchBronce = new Bronce(req.body)
        patchBronce._id = id
        if (req.file) {
            patchBronce.img = req.file.path
        }
        const bronceDB = await Bronce.findByIdAndUpdate(id, patchBronce)
        if (!bronceDB) {
            return next(setError(404, 'Bronce not found'))
        }
        if (bronceDB.img) deleteFile(bronceDB.img)
        return res.status(200).json({ new: patchBronce, old: bronceDB })
    } catch (error) {
        return next(setError(500, 'Bronce Patch server error'))
    }
}

const deleteBronce = async (req, res, next) => {
    try {
        const { id } = req.params
        const bronceDB = await Bronce.findByIdAndDelete(id)
        if (!bronceDB) {
            return next(setError(404, 'Bronce not found'))
        }
        if (bronceDB.img) deleteFile(bronceDB.img)
        return res.status(200).json(bronceDB)
    } catch (error) {
        return next(setError(500, 'Bronce removed server error'))
    }
}

module.exports = {
    postNewBronce,
    getAllBronce,
    getBronce,
    patchBronce,
    deleteBronce
}
