const mongoose = require('mongoose');

let estadosValidos = {
    values: ['ABIERTO', 'CERRADO', 'EJECUTANDOSE'],
    message: '{VALUE} no es un estado válido'
}

let Schema = mongoose.Schema;

let TicketSchema = new Schema({
    titulo:{
        type: String,
        required: [true, 'El ticket debe tener un titulo']
    },
    descripcion:{
        type: String,
        required: [true, 'El ticket debe tener una descripción']
    },
    img: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        default: 'ABIERTO',
        enum: estadosValidos
    },
    departamento:{
        type:String,
        default: 'soporte',
    },
    usuario: [
        {
            type:Schema.Types.ObjectId,
            ref: 'usuario'
        }
    ],
    comentarios: [
        {
            type:Schema.Types.ObjectId,
            ref: 'comentario'
        }
    ],
    notificaciones:[
        {
            type:Schema.Types.ObjectId,
            ref: 'notificacion'
        }
    ],
    fecha: {
        type:Date,
        default:Date.now
    }


});

module.exports = mongoose.model('ticket', TicketSchema);