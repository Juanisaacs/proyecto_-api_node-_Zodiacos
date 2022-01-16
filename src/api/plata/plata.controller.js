const Plata = require('./plata.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../utils/middlewares/deleteFile')


const postNewPlata = async (req, res, next) => {
    try {
        const newPlata = new Plata()
        newPlata.name = req.body.name
        newPlata.tipo = req.body.tipo
        newPlata.ataque= req.body.ataque
        if (req.file) {
            newPlata.img = req.file.path
        }
        const plataDB = await newPlata.save()
        return res.status(201).json(plataDB)
    } catch (error) {
        return next(setError(500, 'Plata not saved'))
    }
}

const getAllPlata = async (req, res, next) => {
    try {
        const plataDB = await Plata.find()
        res.status(200).json(plataDB)
    } catch (error) {
        return next(setError(500, 'Plata failed server'))
    }
}

const getPlata = async (req, res, next) => {
    try {
        const { id } = req.params
        const plataDB = await Plata.findById(id)
        if (!plataDB) {
            return next(setError(404, 'Plata not found'))
        }
        return res.status(200).json(plataDB)
    } catch (error) {
        return next(setError(500, 'Plata server error'))
    }
}

const patchPlata = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchPlata = new Plata(req.body)
        patchPlata._id = id
        if (req.file) {
            patchPlata.img = req.file.path
        }
        const plataDB = await Plata.findByIdAndUpdate(id, patchPlata)
        if (!plataDB) {
            return next(setError(404, ' Plata not found'))
        }
        if (plataDB.img) deleteFile(plataDB.img)
        return res.status(200).json({ new: patchPlata, old: plataDB })
    } catch (error) {
        return next(setError(500, 'Plata Patch server error'))
    }
}

const deletePlata = async (req, res, next) => {
    try {
        const { id } = req.params
        const plataDB = await Plata.findByIdAndDelete(id)
        if (!plataDB) {
            return next(setError(404, ' Plata not found'))
        }
        if (plataDB.img) deleteFile(plataDB.img)
        return res.status(200).json(plataDB)
    } catch (error) {
        return next(setError(500, 'Plata removed server error'))
    }
}

module.exports = {
    postNewPlata,
    getAllPlata,
    getPlata,
    patchPlata,
    deletePlata,
}