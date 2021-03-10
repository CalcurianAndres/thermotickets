const express = require('express');


const app = express();

//rutas que se utilizaran en el sistema
app.use ( require('./tickets.routes'));
app.use ( require('./usuarios.routes'));
app.use ( require('./login.routes'));
app.use ( require('./upload.routes'));
app.use ( require('./imagenes.routes'));
app.use (require('./estadistica.routes'));



module.exports = app;