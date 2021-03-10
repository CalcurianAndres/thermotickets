const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const Usuario = require('../database/models/usuarios.model');
const Ticket = require('../database/models/ticket.model');

const app = express();

app.use(fileUpload());

app.put('/api/upload/:tipo/:id', (req, res)=>{

    let tipo = req.params.tipo;
    let id = req.params.id;

    if(!req.files){
        return res.status(400)
                .json({
                    ok:false,
                    err:{
                        message:'No se ah seleccionado ningun archivo'
                    }
        });
    }

    //validad tipo
    let tipoValido = ['errors', 'usuarios'];
    if( tipoValido.indexOf( tipo ) < 0 ){
        return res.status( 400 ).json({
            ok:false,
            err:{
                message:'Error de url'
            }
        })
    }


    let archivo = req.files.archivo;
    let NombreSep = archivo.name.split('.');
    let extension = NombreSep[NombreSep.length - 1];

    let extensionesValidas = ['png', 'jpg', 'jpeg'];

    if(extensionesValidas.indexOf( extension ) < 0){
        return res.status( 400 ).json({
            ok:false,
            err:{
                message:'Extension de archivo no valido'
            }
        })
    }

    //cambiar nombre de la imagen
    let nombreArchivo = `${id}-${ new Date().getMilliseconds()}.${extension}`; 

    archivo.mv(`server/uploads/${tipo}/${nombreArchivo}`, (err)=>{
        if(err){
            return res.status(500)
                        .json({
                            ok:false,
                            err
            });
        }

        if(tipo === 'usuarios'){
            imagenUsuario(id, res, nombreArchivo);
        }else{
            imagenErrors(id, res, nombreArchivo);
        }

    });

});

function imagenUsuario(id, res,nombreArchivo){

    Usuario.findById(id,(err,usuarioDB)=>{
        if( err ){
            borrarArchivo(nombreArchivo, 'usuarios')
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!usuarioDB){
            borrarArchivo(nombreArchivo, 'usuarios')
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'usuario no existe'
                }
            });
        }
        
        borrarArchivo(usuarioDB.img, 'usuarios')

        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err, imageUpdated)=>{

            res.json({
                ok:true,
                usuario:usuarioDB,
                img:nombreArchivo
            })


        });

    });

}

function imagenErrors(id,res, nombreArchivo){
    Ticket.findById(id,(err,ticketDB)=>{
        if( err ){
            borrarArchivo(nombreArchivo, 'errors')
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!ticketDB){
            borrarArchivo(nombreArchivo, 'errors')
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'ticket no existe'
                }
            });
        }

        borrarArchivo(ticketDB.img, 'errors')

        ticketDB.img = nombreArchivo;

        ticketDB.save((err, imageUpdated)=>{

            res.json({
                ok:true,
                ticket:ticketDB,
                img:nombreArchivo
            })


        });

    });
}

function borrarArchivo(nombreArchivo, tipo){
    let pathImage = path.resolve(__dirname, `../uploads/${ tipo }/${ nombreArchivo }`);

        if( fs.existsSync(pathImage) ){
            fs.unlinkSync(pathImage)
        }
}
module.exports = app;