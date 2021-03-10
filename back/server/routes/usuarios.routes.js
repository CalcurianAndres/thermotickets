const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../database/models/usuarios.model');
const Ticket = require('../database/models/ticket.model');
const { verificarToken, verificar_Role } = require('../auth/autenticacion');

const app = express();

app.get('/api/usuarios', verificarToken, (req, res)=>{

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5
    limite = Number(limite);

    Usuario.find({estado:true})
            .sort({Role:1})
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios)=>{
                if ( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }

            Usuario.countDocuments({estado:true},(err, total)=>{
                if ( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }

                res.json({
                    ok:true,
                    usuarios,
                    total
                }); 
            });
        });

});

app.post('/api/usuario', [verificarToken, verificar_Role], (req,res)=>{

    let body = req.body;

    let usuario = new Usuario({
        Nombre: body.Nombre,
        Apellido: body.Apellido,
        Correo: body.Correo,
        Password: bcrypt.hashSync(body.Password, 10),
        AnyDesk: body.AnyDesk,
        Rol: body.Rol,
    });

    usuario.save((err, UsuarioDB) => {
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            usuario:UsuarioDB
        });

    });

});


app.put('/api/usuario/:id', [verificarToken, verificar_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    delete body.Password;

    Usuario.findByIdAndUpdate(id, body,{new:true, runValidators:true}, (err, UsuarioDB) => {
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }
    
        res.json({
            ok:true,
            usuario:UsuarioDB
        });

    });
});

app.delete('/api/usuario/:id', [verificarToken, verificar_Role], (req, res)=>{
    let id = req.params.id;
    let borrar = {
        estado:false
    }

    Usuario.findByIdAndUpdate(id, borrar, (err, usuarioBorrado) => {
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        if(!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'usuario no encontrado'
                }
            });
        }

        res.json({
            ok:true,
            usuario:usuarioBorrado
        });
    });
});

app.get('/api/perfil/:id', verificarToken, (req, res) => {

    let _id = req.params.id;
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5
    limite = Number(limite);

    Ticket.find({usuario:_id})
        .skip(desde)
        .limit(limite)
        .exec((err,Total)=>{

        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        Ticket.countDocuments({usuario:_id,estado:'ABIERTO'}, (err,Abiertos)=>{
    
            if( err ){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            Ticket.countDocuments({usuario:_id,estado:'EJECUTANDOSE'}, (err,Ejecutandose)=>{
        
                if( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
                Ticket.countDocuments({usuario:_id,estado:'CERRADO'}, (err,Cerrados)=>{
            
                    if( err ){
                        return res.status(400).json({
                            ok:false,
                            err
                        });
                    }
                    res.json({
                        ok:true,
                        Total,
                        Abiertos,
                        Ejecutandose,
                        Cerrados
                    });
                });
            });
        });
    });

})

app.put('/api/password/:id', (req,res)=>{
    const id = req.params.id;
    const body = req.body;

    Usuario.findOne({_id:id}, (err,usuarioDB)=>{
        if ( err ){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if( !bcrypt.compareSync( body.oldPass, usuarioDB.Password )){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'La contraseña actual es incorrecta'
                }
            });
        }

        let Password = bcrypt.hashSync(body.newPass, 10);

        Usuario.findOneAndUpdate({_id:id}, {Password}, (err,usuarioDB)=>{
            if ( err ){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            res.json({
                usuarioDB,
                mensaje:'contraseña cambiada satisfactoriamente'
            })
        })

    });
})



module.exports = app;