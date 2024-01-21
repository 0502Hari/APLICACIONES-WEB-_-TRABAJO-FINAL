const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;

const client = new mongo ('mongodb://localhost:27017');

// Endpoint para obtener todos los usuarios
router.get('/users', async (req, res) => {
    const data=req.body;
    const conexion = client.db('dbeveryday').collection('usuario');
    try {
        const usuario= await conexion.find().toArray();
        return res.status(201).json({ success: true ,usuario});
    } catch (error) {
        return res.status(500).json({ error: false, error});
    } 
});

/*
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
*/
module.exports = router;
