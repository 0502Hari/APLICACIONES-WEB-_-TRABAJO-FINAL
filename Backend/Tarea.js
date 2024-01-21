const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const tareaSchema = new mongoose.Schema({
  Titulo: {
    type: String,
    required: true,
  },
  Descripcion: {
    type: String,
    required: true,
  },
  Prioridad: {
    type: Number,
    required: true,
  },
  Frecuencia: {
    type: String,
    enum: ['Una vez', 'Diaria', 'Semanal', 'Mensual', 'Anual'],
    required: true,
  },
  Etiqueta: {
    type: String,
    enum: ['Rojo (Personal)', 'Azul (Estudios)', 'Verde (Laboral)'],
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },

});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;