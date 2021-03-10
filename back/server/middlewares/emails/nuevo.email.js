const nodemailer = require('nodemailer');
const {header, footer} = require('../templates/template.email')


// ENVIAR EMAIL POR CORREO NUEVO

function emailNuevo(titulo, correo, nombre, apellido, any,sede,departamento){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASS_CORREO
        }
    });
    let tituloCorreo = 'Nuevo ticket creado!'
    const mensaje = 
        `${header(tituloCorreo)}
        Se ha generado un nuevo ticket <strong>${titulo}</strong>
        <br>
        Tu solicitud sera atendida lo mas pronto posible, el equipo de soporte técnico
        se pondrá en contacto con usted en cualquier momento.
        ${footer}`;

    var mailOptions = {
        from: '"Soporte Técnico" <thermo.soporte.group@gmail.com>',
        to: correo,
        subject: 'Ticket creado exitosamente',
        html:mensaje
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
            if(departamento != 'profit'){
                nuevoSoporte(titulo, nombre, apellido, any,sede)
            }else{
                nuevoProfit(titulo, nombre, apellido, any,sede)
            }
        }else{
            if(departamento != 'profit'){
                nuevoSoporte(titulo, nombre, apellido, any,sede)
            }else{
                nuevoProfit(titulo, nombre, apellido, any,sede)
            }
        }
    });


}
function nuevoProfit(titulo, nombre, apellido, any,sede){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASS_CORREO
        }
    });
    let tituloCorreo = 'Nuevo ticket creado!'
    var mailOptions = {
        from: '"Soporte Técnico (thermo)" <thermo.soporte.group@gmail.com>',
        to: "soporte.mara.ticket@gmail.com",
        subject: `Nuevo ticket - ${titulo}`,
        html:`${header(tituloCorreo)}
                Se generó un nuevo ticket por ${nombre} ${apellido} (${sede}), con el titulo ${titulo}
                <br>
                el AnyDesk del contacto es: <strong>${any}</strong>
            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
}

function nuevoSoporte(titulo, nombre, apellido, any,sede){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASS_CORREO
        }
    });
    let tituloCorreo = 'Nuevo ticket creado!'
    var mailOptions = {
        from: '"Soporte Técnico (thermo)" <thermo.soporte.group@gmail.com>',
        to: "calcurianandres@gmail.com, jsotin@hotmail.com",
        subject: `Nuevo ticket - ${titulo}`,
        html:`${header(tituloCorreo)}
                Se generó un nuevo ticket por ${nombre} ${apellido} (${sede}), con el titulo ${titulo}
                <br>
                el AnyDesk del contacto es: <strong>${any}</strong>
            ${footer}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
}

module.exports = {
    emailNuevo
}
