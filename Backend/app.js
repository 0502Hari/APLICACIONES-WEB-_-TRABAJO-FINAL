const { Tarea } = require('./Tarea'); 
const express = require('express');
const { connectToDb, getDb } = require('./db')
const { Usuario } = require("./Usuario");
const { ObjectId } = require('mongodb');
// ini app & mid
const app = express();
const cors = require('cors');   // cross origin///////////////////

app.use(cors());
app.use(express.json())
// db connection
connectToDb((err)=> {
	if (!err){
		app.listen(3001 ,() => {
			console.log('app listening on port 3001')
		});
		db = getDb();
	}
})
	

///////////////////////////// USUARIO //////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/Usuario', (req, res) => {
	let task = req.body;
	db.collection('Usuario')
	.insertOne(task)
	.then( (result)=> {
        res.status(201).json(result)
    })
	.catch( err => {
        res.status(500).json( {error:'could not insert'})
    })
})
app.patch('/Usuario/:id', (req,res) => {
	const updates = req.body
	if (ObjectId.isValid(req.params.id)) {
		db.collection('Usuario')
		.updateOne({_id:new ObjectId(req.params.id)}, {$set:updates})
		.then( (result)=> {
            res.status(200).json(result)
        })
		.catch( err => {
            res.status(500).json( {error:'could not update'})
        })
	}
	else {
		res.status(500).json( {error:'invalid id'})
    }
})

app.delete('/Usuario/:id', (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection('Usuario')
		.deleteOne({_id:new ObjectId(req.params.id)})
		.then( (result)=> {
            res.status(200).json(result)
        })
		.catch( err => {
            res.status(500).json( {error:'could not delete'})
        })
	}		
	else {
        res.status(500).json( {error:'invalid id'})
    }
})

app.get('/Usuario', (req, res) => {
	let Usuario = []
	db.collection('Usuario')
		.find()
		.sort({Nombre:1})
		.forEach( user => Usuario.push(user) )
		.then( ()=> {
			res.status(200).json(Usuario)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

/*
// Endpoint para validar la contraseña
app.post('/validarPass', (req, res) => {
    const password = req.body.password;
    // Expresión regular para verificar que la contraseña tenga al menos 6 caracteres alfanuméricos
    //const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
	const passwordRegex = /^[A-Za-z\d]{6,}$/;

    if (password && passwordRegex.test(password)) {
        res.status(200).json({ valid: true, message: 'La contraseña cumple con los requisitos.'});
    } else {
        res.status(400).json({ valid: false, message: 'La contraseña debe tener al menos 6 caracteres alfanuméricos.' });
    }
});
*/

////////////////////////////////  TAREAS    ////////////////////////////////////////////////////////////////////////////

// TASKS

app.post('/Tareas', (req, res) => {
	let task = req.body;
	db.collection('Tarea')
	.insertOne(task)
	.then( (result)=> {
        res.status(201).json(result)
    })
	.catch( err => {
        res.status(500).json( {error:'could not insert'})
    })
})
app.get('/Tarea', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find()
		.sort({Titulo:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

app.get('/Tarea/:id', (req, res) => {

	if (ObjectId.isValid(req.params.id)) {

		db.collection('Tarea')
			.findOne({_id:new ObjectId(req.params.id)})
			.then(doc => {
				res.status(200).json(doc)
			})
			.catch(err => {
				res.status(500).json( {error:'could not fetch'})
			})
		}
		else {
        res.status(500).json( {error:'invalid id'})
    }
})



app.delete('/Tarea/:id', (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection('Tarea')
		.deleteOne({_id:new ObjectId(req.params.id)})
		.then( (result)=> {
            res.status(200).json(result)
        })
		.catch( err => {
            res.status(500).json( {error:'could not delete'})
        })
	}		
	else {
        res.status(500).json( {error:'invalid id'})
    }
})
///////////////borrar MASIVO///////////AL FIN =) 
app.delete('/TareaM/:ids', (req, res) => {
    // Divide los IDs por comas y convierte cada ID en un ObjectId
    let ids = req.params.ids.split(',').map(id => new ObjectId(id));

    // Verifica que todos los IDs son válidos
    if (ids.every(ObjectId.isValid)) {
        db.collection('Tarea')
            .deleteMany({ _id: { $in: ids } })
            .then(result => {
                if (result.deletedCount >= 0) {
                		res.status(200).json({ message: `${result.deletedCount} elementos eliminados` });

                } else {
                    res.status(404).json({ error: 'No se encontraron elementos para eliminar' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'No se pudieron eliminar los elementos' });
            });
    } else {
        res.status(500).json({ error: 'ID inválido' });
    }
});
/////////////////////////////
///EN INSOMNIA http://127.0.0.1:3000/TareaM/658508e766a1a8b3bf716a27,658508f366a1a8b3bf716a28


app.put('/Tarea/:id', (req,res) => {
	const updates = req.body;
	updates.complete=true;
	const {_id,...data}=updates;
	console.log(data);
	console.log(req.params.id);
	if (ObjectId.isValid(req.params.id)) {
		db.collection('Tarea')
		.updateOne({_id:new ObjectId(req.params.id)}, {$set:data})
		.then( (result)=> {
            res.status(200).json(result)
        })
		.catch( err => {
            res.status(500).json( {error:'could not update'})
        })
	}
	else {
		res.status(500).json( {error:'invalid id'})
    }
})

app.get('/TareaPri', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find({ Prioridad: {$lt:5} })
		.sort({Prioridad:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

/*
app.get('/TareaPri', (req, res) => {
	db.collection('Tarea')
	  .find({ Prioridad: { $lt: 5 } })
	  .sort({ Prioridad: 1 })
	  .toArray()
	  .then((tasks) => {
		res.status(200).json(tasks);
	  })
	  .catch(() => {
		res.status(500).json({ error: 'could not fetch' });
	  });
  });*/

app.get('/TareaDia', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find({ Frecuencia: "Diario" })
		.sort({Prioridad:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

app.get('/TareaSem', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find({ Frecuencia: "Semanal" })
		.sort({Prioridad:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

app.get('/TareaMen', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find({ Frecuencia: "Mensual" })
		.sort({Prioridad:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

app.get('/TareaAn', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find({ Frecuencia: "Anual" })
		.sort({Prioridad:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})
app.get('/TareaUna', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find({ Frecuencia: "Una vez" })
		.sort({Prioridad:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

app.get('/TareaAzul', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find({ Etiqueta: "Azul" })
		.sort({Prioridad:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

app.get('/TareaVerde', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find({ Etiqueta: "Verde" })
		.sort({Prioridad:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

app.get('/TareaRoja', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find({ Etiqueta: "Roja" })
		.sort({Prioridad:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})


app.get('/TareaNoPri', (req, res) => {
	let Tarea = []
	db.collection('Tarea')
		.find({ Prioridad: {$gt:4} })
		.sort({Prioridad:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

///////////////////////////////////////////////////////////////////////
///////////////PROYECTO ///////////////////////////////////
app.post('/Proyecto', (req, res) => {
	let task = req.body;
	db.collection('Proyecto')
	.insertOne(task)
	.then( (result)=> {
        res.status(201).json(result)
    })
	.catch( err => {
        res.status(500).json( {error:'could not insert'})
    })
})

app.get('/ProyectoPers', (req, res) => {
	let Tarea = []
	db.collection('Proyecto')
		.find({ Nombre: "Personal" })
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})
//http://127.0.0.1:3000/ProyectoPers

app.get('/ProyectoLab', (req, res) => {
	let Tarea = []
	db.collection('Proyecto')
		.find({ Nombre: "Laboral" })
		//.sort({ Nombre:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

app.get('/ProyectoEst', (req, res) => {
	let Tarea = []
	db.collection('Proyecto')
		.find({ Nombre: "Estudios" })
		//.sort({ Nombre:1})
		.forEach( task => Tarea.push(task) )
		.then( ()=> {
			res.status(200).json(Tarea)
		})
		.catch( () => {
			res.status(500).json( {error:'could not fetch'})
		})

})

app.get('/ProyectoContTarea', (req, res) => {
    db.collection('Proyecto')
        .aggregate([
            // Filtra los proyectos que tengan el atributo 'idArray_Tareas'
            { $match: { idArray_Tareas: { $exists: true, $ne: [] } } },
            // Agrega un nuevo campo 'num_tareas' con el tamaño del arreglo 'idArray_Tareas'
            { $addFields: { num_tareas: { $size: '$idArray_Tareas' } } },
            // Proyecta los campos 'Nombre' y 'num_tareas'
            { $project: { _id: 0, Nombre: 1, num_tareas: 1 } }
        ])
        .toArray()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({ error: 'could not fetch' });
        });
});

app.put('/completar-tarea/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
		console.log(taskId);
        const tarea = await Tarea.findByIdAndUpdate(taskId, { completed: true }, { new: true });

        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json(tarea);
		//res.status(200).json({ error: 'Ingrese' });
    } catch (error) {
        console.error('Error al completar tarea', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

  app.get('/stats', async (req, res) => {
	try {
	  const totalTasks = await Tarea.countDocuments();
	  const completedTasks = await Tarea.countDocuments({ completed: true });
	  // Agrega otras consultas según tus necesidades
  
	  const stats = {
		totalTasks,
		completedTasks,
		// Otras estadísticas
	  };
  
	  res.json(stats);
	} catch (error) {
	  console.error('Error al obtener estadísticas', error);
	  res.status(500).json({ error: 'Error interno del servidor' });
	}
  });

app.get('/', function (req,res) {
	res.status(200).json({ estado: 'conectado' });
});