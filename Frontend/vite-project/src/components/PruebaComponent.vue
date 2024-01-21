<template>
  <div id="application">
    <!-- Formulario de Nueva Tarea -->
    <section class="task-form-section">
      <form @submit.prevent="addTask" class="task-form" autocomplete="off">
        <h2 class="titulo-formulario">INGRESE SU NUEVA TAREA</h2>

        <div class="form-group">
          <label for="titulo">TÍTULO:</label>
          <input type="text" id="titulo" v-model="newTask.Titulo" placeholder="Ingrese el título" required>
        </div>

        <div class="form-group">
          <label for="descripcion">DESCRIPCIÓN:</label>
          <textarea id="descripcion" v-model="newTask.Descripcion" placeholder="Ingrese la descripción" required></textarea>
        </div>

        <div class="form-group">
          <label for="frecuencia">FRECUENCIA:</label>
          <select id= "frecuencia" v-model="newTask.Frecuencia" required>
            <option value="Una vez">Una vez</option>
            <option value="Diaria">Diaria</option>
            <option value="Semanal">Semanal</option>
            <option value="Mensual">Mensual</option>
            <option value="Anual">Anual</option>
          </select>
        </div>

        <div class="form-group">
          <label for="etiqueta">ETIQUETA:</label>
          <select id="etiqueta" v-model="newTask.Etiqueta" required>
            <option value="Rojo (Personal)">Rojo (Personal)</option>
            <option value="Azul (Estudios)">Azul (Estudios)</option>
            <option value="Verde (Laboral)">Verde (Laboral)</option>
          </select>
        </div>

        <div class="form-group">
          <label for="prioridad">PRIORIDAD:</label>
        </div>

        <div class="form-group range-container">
          <label for="prioridad" class="range-label">Prioridad {{ newTask.Prioridad }}</label>
          <!--<span>{{ newTask.Prioridad }} (Actual)</span>-->
          <input
            type="range"
            id="prioridad"
            v-model="newTask.Prioridad"
            min="1"
            max="5"
            step="1"
            required
          />
          <div class="labels">
            <label>(Siendo 1 Muy Importante y 5 Poco Importante)</label>
          </div>
        </div>

        <button type="submit" class="addTask button">
          <img class="icon" src="./mas.png" alt="Agregar tarea">
          Agregar Nueva Tarea
        </button>

      </form>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newTask: {
        Titulo: "",
        Descripcion: "",
        Prioridad: 5,
        Frecuencia: "Una vez",
        Etiqueta: "Rojo (Personal)",
        complete:false
      },
      backend_server: 'http://127.0.0.1:3001'
    }
  },

  methods: {
    addTask() {
      const title = this.newTask.Titulo;
      const priority = parseInt(this.newTask.Prioridad);
      if (title.trim() !== '' && priority && !isNaN(priority)) {
        var config_request={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
        axios.post(this.backend_server + '/Tareas', this.newTask, { config_request })
          .then(res => {                                         
            this.newTask = {
              Titulo: "",
              Descripcion: "",
              Prioridad: 5,
              Frecuencia: "Una vez",
              Etiqueta: "Rojo (Personal)",
            };
          })
          .catch((error) => {
            console.log(error)
          });  
          // URL de la página externa a la que deseas redireccionar
          const urlExterna = 'http://localhost:5173/';
          window.location.href = urlExterna;
      } else {
        alert('REVISE QUE TODOS LOS CAMPOS ESTÉN CORRECTAMENTE COMPLETADOS')
      }
    },

    Ordenar() {
      var config_request = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };

      axios.get(this.backend_server + '/TareaPri', { config_request })
        .then(res => {
         this.tasks=res.data;
        })
        .catch((error) => {
          console.log(error);
        });

      // Redireccionar a la página externa
      const urlExterna = 'http://localhost:5173/';
      window.location.href = urlExterna;
    },
    
   
  },
};
</script>

<style lang="scss">
#application {
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.task-form-section {
  background-color: #fcf8f2;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0);
  padding: 20px;
  text-align: center;
  width: 500px;
}

.task-form h2 {
  margin-bottom: 0px;
  color: #08eb1f;//#CDDC39;//INGRESE nueva task
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #08eb1f;//#9c9c97
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #fbfbfb;
  border-radius: 4px;
  font-size: 16px;
  color: #CDDC39;//CDDC39 Autocomplete
  font-family: cursive;
}

.cursive {
  font-family: cursive;
}

.form-group textarea {
  resize: vertical;
}

/* Estilo para el número seleccionado */
.selected-priority {
  font-size: 18px;
  color: #d9127f;//CDDC39  
  margin-bottom: 10px;
}

.range-container {
  position: relative;
}

.range-label {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  top: -20px;
  font-size: 14px;
  color: #CDDC39;
}

.addTask {
  background-color: #00972b;//8BC34A //HEADER //39a08c
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

.addTask:hover {
  background-color: #8BC34A;//#8BC34A
}

.icon {
  width: 45px;
  margin-right: 1px;
}

.titulo-formulario {
  font-size: 22px;
  font-family: 'Tipo Letra Form 1',sans-serif;
 
}

</style>


