const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oroSchema = new Schema({

    name: { type: 'String', required: true },
    tipo: { type: 'string', required: true },
    ataque: { type: 'string', required: true},
    img: { type: 'string', required: true},
    

},
    {
        timestamps: true
    }
);

const oro = mongoose.model("Oro", oroSchema);
module.exports = oro;