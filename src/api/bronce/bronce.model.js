const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bronceSchema = new Schema({

    name: { type: String, required: true, trim:true},
    tipo: { type: String, required: true, trim: true},
    ataque: { type: String, required: true, trim:true},
    img: { type: String, required: true},
    

},
    {
        timestamps: true
    }
);

const bronce = mongoose.model("bronce", bronceSchema);
module.exports = bronce;