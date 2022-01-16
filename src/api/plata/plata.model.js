const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plataSchema = new Schema({
    name: { type: 'String', required: true },
    tipo: { type: 'string', required: true },
    ataque: { type: 'string', required: true},
    img: { type: 'string', required: true},
   
},
    {
        timestamps: true
    }
);

const plata = mongoose.model("plata", plataSchema);
module.exports = plata;