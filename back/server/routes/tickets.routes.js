const express = require('express');
var exec = require('child_process').exec;

const Ticket = require('../database/models/ticket.model');
const Usuario = require('../database/models/usuarios.model');
const Comentario = require('../database/models/comentarios.model');
const Notificacion = require('../database/models/notificaciones.model');

const { verificarToken, verificar_Role } = require('../auth/autenticacion');
const { emailNuevo } = require('../middlewares/emails/nuevo.email');
const { emailModificacion } = require('../middlewares/emails/modificacion.email');


const app = express();

app.get('/api/tickets', [verificarToken, verificar_Role], (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5
    limite = Number(limite);

    const departamento = req.query.departamento || '';

    Ticket.find({'departamento':departamento})
            .populate('usuario', 'Nombre Apellido Correo AnyDesk img')
            .where('estado').ne('CERRADO')
            .skip(desde)
            .limit(limite)
            .exec((err, ticket) =>{
                if( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
        
            Ticket.countDocuments({'departamento':departamento, 'departamento':departamento}, (err,conteo)=>{

                if( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
            Ticket.countDocuments({estado:'ABIERTO', 'departamento':departamento}, (err,abierto)=>{
                if( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
            Ticket.countDocuments({estado:'EJECUTANDOSE', 'departamento':departamento}, (err, ejecutandose)=>{
                if( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
            Ticket.countDocuments({estado:'CERRADO', 'departamento':departamento}, (err, cerrado)=>{
                if( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
                res.json({
                    ok:true,
                    ticket,
                    total:conteo,
                    abierto,
                    ejecutandose,
                    cerrado
                })
            })
            })
            })
        });
    });
});

app.post('/api/ticket', verificarToken, (req, res) => {

    let body = req.body;

    let ticket = new Ticket({
        titulo: body.Titulo,
        descripcion: body.Descripcion,
        departamento:body.Departamento,
        estado: body.estado,
        usuario: req.usuario._id
    });

    ticket.save((err, ticketDB) => {

        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        emailNuevo(ticketDB.titulo, req.usuario.Correo, req.usuario.Nombre, req.usuario.Apellido, req.usuario.AnyDesk,req.usuario.Sede,ticketDB.departamento);

        res.json({
            ok:true,
            ticket: ticketDB
        })

    });

});

app.put('/api/ticket/:id', [verificarToken, verificar_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Ticket.findById(id, (err, ticketDB) =>{
        if( err ){
            return res.status(401).json({
                ok:false,
                err
            });
        }

        if(!ticketDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Ticket no encontrado'
                }
            });
        }

        if(ticketDB.estado != body.estado && ticketDB.departamento === body.departamento){
            body.tipo = `cambió de estado a ${body.estado}`;
        }else if(ticketDB.departamento != body.departamento && ticketDB.estado === body.estado){
            body.tipo = `cambió de departamento a ${body.departamento}`;
        }else if(ticketDB.estado != body.estado && ticketDB.departamento != body.departamento){
            body.tipo = `cambió de departamento a ${body.departamento} y cambió de estado a ${body.estado}`;
        }else{
            return res.json(ticketDB)
        }

        // ENVIAR CORREOS
        const id_user = ticketDB.usuario[0];

        Usuario.findById(id_user, (err, DBuser)=>{
            if( err ){
                return res.status(401).json({
                    ok:false,
                    err
                });
            }

            if(!DBuser){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message:'usuario no encontrado'
                    }
                });
            }
            emailModificacion(DBuser.Correo, req.usuario.Nombre, req.usuario.Apellido, req.body.tipo, ticketDB.titulo, req.body.mensaje)

        })

        // FIN DE ENVIAR CORREOS

        const Noti = ticketDB.notificaciones;
        if(Noti.length <= 0){

            let notificacion = new Notificacion({
                notificacion:[{
                    usuario:body.usuario,
                    tipo:body.tipo,
                    mensaje:body.mensaje
                }]
            });

            notificacion.save(async(err, notificacion)=>{
                if( err ){
                    return res.status(401).json({
                        ok:false,
                        err
                    });
                }

                const update = {estado:body.estado,departamento:body.departamento,notificaciones:notificacion._id};

                await Ticket.findByIdAndUpdate(id, update, {new:true, runValidators:true}, (err, ticketDB)=>{
                    if( err ){
                        return res.status(401).json({
                            ok:false,
                            err
                        });
                    }

                    res.json(ticketDB);
                });

            })

        }else{
            Ticket.findByIdAndUpdate(id, {estado:body.estado,departamento:body.departamento},{new:true, runValidators:true}, (err,ticketDB)=>{
                if( err ){
                    return res.status(401).json({
                        ok:false,
                        err
                    });
                }
            });
            Notificacion.findByIdAndUpdate(Noti,{
                $push:{notificacion:[{usuario:body.usuario, tipo:body.tipo, mensaje:body.mensaje}]}}
                , {new:true, runValidators:true},
                (err, Noti) =>{
                    if( err ){
                        return res.status(401).json({
                            ok:false,
                            err
                        });
            
                    }

                    res.json(Noti)


            });
        }


    });
});

app.post('/api/ticket/:id', async (req,res)=>{

    let id = req.params.id;
    let body = req.body;
    
    Ticket.findById(id, (err, ticket)=>{
        if( err ){
            return res.status(401).json({
                ok:false,
                err
            });

        }
        
        const comentary = ticket.comentarios;
        
        if(comentary.length <= 0){
            
            let comentarios = new Comentario({
                comentarios:[{
                    usuario:body.dueno,
                    mensaje:body.mensaje
                }]
            });

            comentarios.save(async(err, comentario)=>{
                if( err ){
                    return res.status(401).json({
                        ok:false,
                        err
                    });
                }

                const update = {comentarios:comentario._id};
                await Ticket.findByIdAndUpdate(id, update, {new:true, runValidators:true}, (err, ticketDB)=>{
                    if( err ){
                        return res.status(401).json({
                            ok:false,
                            err
                        });
                    }

                    res.json(ticketDB);
                });
            });
        }else{
            Comentario.findByIdAndUpdate(comentary, {$push:{comentarios:[{usuario:body.dueno, mensaje:body.mensaje}]}}, {new:true, runValidators:true},
                (err, coment)=>{
                if( err ){
                    return res.status(401).json({
                        ok:false,
                        err
                    });
                }

                res.json(coment)
            })
        }
    });
});

// [verificarToken, verificar_Role]

app.get('/api/ticket/:id',verificarToken,  (req, res) => {

    let id = req.params.id;

    Ticket.findById(id)
    .populate('usuario', 'Nombre Apellido Correo AnyDesk img')
    .populate({path:'comentarios', populate:{path:'comentarios.usuario', select:'Nombre Apellido img'}})
    .populate({path:'notificaciones', populate:{path: 'notificacion.usuario', select:'Nombre Apellido'}})
    .exec((err, ticketDB) => {
        if( err ){
            return res.status(401).json({
                ok:false,
                err
            });
        }

    if( err ){
        return res.status(401).json({
            ok:false,
            err
        });
    }

    if(!ticketDB){
        return res.status(400).json({
            ok:false,
            err:{
                message:'ticket no encontrado'
            }
        });
    }

    res.json({
        ok:true,
        ticket:ticketDB
    });
    });
});

app.get('/api/ping', async(req, res)=>{
    
    var pingCmd = "ping 8.8.8.8";
    var result = '';

    function puts(error, stdout, stderr) {
    if (error) {
    res.json(stdout)
    console.log("error", "Error connecting");
    result = "Failed";
    console.log(result)
    }
    else {
    res.json(stdout)
    result = "Success"
    console.log(result)
    }

    
}
exec(pingCmd, puts);

});

module.exports = app;