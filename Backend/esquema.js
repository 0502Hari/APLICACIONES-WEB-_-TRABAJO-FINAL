const user={
    username: "ejemploUsuario",
    email: "usuario@ejemplo.com",
    password: "contraseña", // Se recomienda el uso de técnicas seguras para almacenar contraseñas
    // Otros campos opcionales
}

db.users.insertOne({
    username: "ejemploUsuario",
    email: "usuario@ejemplo.com",
    password: "contraseña", // Se recomienda el uso de técnicas seguras para almacenar contraseñas
    // Otros campos opcionales
  });

  db.projects.insertOne({
    title: "Proyecto de ejemplo",
    description: "Descripción del proyecto de ejemplo.",
    created_by: ObjectId("ID_DEL_USUARIO_QUE_LO_CREO"), // ID del usuario creador del proyecto
    created_at: new Date(),
    updated_at: new Date()
    // Otros campos opcionales
  });

  db.tasks.insertOne({
    title: "Completar informe",
    description: "Preparar informe mensual para presentación.",
    status: "pendiente",
    priority: "alta",
    due_date: new Date("2023-12-31"),
    assigned_to: ObjectId("ID_DEL_USUARIO_ASIGNADO"), // ID del usuario al que se le asigna la tarea
    project_id: ObjectId("ID_DEL_PROYECTO"), // ID del proyecto al que pertenece la tarea
    created_at: new Date(),
    updated_at: new Date()
    // Otros campos opcionales
  });


  //////////////////////////////
  // metodos

  db.tasks.updateOne(
    { _id: ObjectId("ID_DE_LA_TAREA") },
    { $set: { status: "completada", updated_at: new Date() } }
  );

  db.tasks.deleteOne({ _id: ObjectId("ID_DE_LA_TAREA") });


  //////////////////////////////////////////////////////////////// endpoints
const express = require('express');
const router = express.Router();

// Endpoint para obtener todos los usuarios
router.get('/users', (req, res) => {
  // Lógica para obtener todos los usuarios de la base de datos
  res.send('Obtener todos los usuarios');
});

// Endpoint para obtener un usuario por ID
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Lógica para obtener un usuario por su ID de la base de datos
  res.send(`Obtener usuario con ID ${userId}`);
});

// Endpoint para crear un nuevo usuario
router.post('/users', (req, res) => {
  // Lógica para crear un nuevo usuario en la base de datos
  res.send('Crear un nuevo usuario');
});

// Endpoint para actualizar un usuario por ID
router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Lógica para actualizar un usuario por su ID en la base de datos
  res.send(`Actualizar usuario con ID ${userId}`);
});

// Endpoint para eliminar un usuario por ID
router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Lógica para eliminar un usuario por su ID de la base de datos
  res.send(`Eliminar usuario con ID ${userId}`);
});

// Y así sucesivamente, puedes hacer lo mismo para tareas y proyectos

// Endpoint para obtener todas las tareas
router.get('/tasks', (req, res) => {
  // Lógica para obtener todas las tareas de la base de datos
  res.send('Obtener todas las tareas');
});

// Endpoint para obtener una tarea por ID
router.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  // Lógica para obtener una tarea por su ID de la base de datos
  res.send(`Obtener tarea con ID ${taskId}`);
});

// Endpoint para crear una nueva tarea
router.post('/tasks', (req, res) => {
  // Lógica para crear una nueva tarea en la base de datos
  res.send('Crear una nueva tarea');
});

// Endpoint para actualizar una tarea por ID
router.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  // Lógica para actualizar una tarea por su ID en la base de datos
  res.send(`Actualizar tarea con ID ${taskId}`);
});

// Endpoint para eliminar una tarea por ID
router.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  // Lógica para eliminar una tarea por su ID de la base de datos
  res.send(`Eliminar tarea con ID ${taskId}`);
});

// Puedes seguir este patrón para crear endpoints para proyectos, comentarios, etc.

module.exports = router;




////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB (asegúrate de tener tu URL de conexión)
mongoose.connect('mongodb://localhost:27017/nombre_de_tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Otros campos necesarios
});

// Definir el modelo de Usuario
const User = mongoose.model('User', userSchema);

// Endpoint para obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para obtener un usuario por ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para crear un nuevo usuario
router.post('/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    // Otros campos según el esquema
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Y así sucesivamente, puedes hacer lo mismo para tareas y otros modelos

module.exports = router;



