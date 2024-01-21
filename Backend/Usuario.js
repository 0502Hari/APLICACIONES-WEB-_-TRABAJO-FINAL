const {ObjectId} = require('mongodb');
const mongoose = require("mongoose");
const cors = require('cors');   // cross origin

const Usuario = new mongoose.Schema({
  id: {
    type: ObjectId,
    required: false,
  },
  Nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
 },
  contraseña: {
    type: Boolean,
    required: false,
    default: true,
    validate: {
        validator: function (value) {
            return value == 6;
            },
            message: () => "Ingresa una contraseña de 6 caracteres alfanuméricos",
        },
  },
});


module.exports = { Usuario };