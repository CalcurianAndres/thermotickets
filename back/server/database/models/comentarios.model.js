const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ComentarioSchema = new Schema([{
    comentarios:[
        {
            fecha:{
                type:Date,
                default:Date.now
            },
            usuario:{
                type:Schema.Types.ObjectId,
                ref: 'usuario'
            },
            mensaje: {
                type:String,
                required: true
            }
        }
        
    ]
}]);


module.exports = mongoose.model('comentario', ComentarioSchema)