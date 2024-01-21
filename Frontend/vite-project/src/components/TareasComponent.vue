<template>
  <div>
     <!-- para que filtremos -->
      <div class="filter-section">
        <label for="etiqueta">Filtrar por Etiqueta:</label>
        <select v-model="selectedEtiqueta" @change="filtrarPorEtiqueta">
          <option value="">Mostrar Todas</option>
          <option value="Rojo (Personal)">Rojo (Personal)</option>
          <option value="Azul (Estudios)">Azul (Estudios)</option>
          <option value="Verde (Laboral)">Verde (Laboral)</option>
        </select>
    </div>
  
     <!-- la listita  -->
     <section v-if="tasks && tasks.length > 0" class="task-list-section">
        <div class="tablaTareas">
          <table class="task-table">
            <thead>
              <tr>
                <th @click="ordenar('Titulo')" class="clickable cabecera-tarea">Título</th>
                <th @click="ordenar('Descripcion')"  class="clickable cabecera-tarea">Descripción</th>
                <th @click="ordenar('Prioridad')" class="clickable cabecera-tarea">Prioridad</th>
                <th @click="ordenar('Etiqueta')" class="clickable cabecera-tarea">Etiqueta</th>
                <th @click="ordenar('Frecuencia')" class="clickable cabecera-tarea">Frecuencia</th>
                <th class="cabecera-tarea">Acciones</th> 
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, key) in tasks" :key="key">

                <td>{{ task.Titulo }}</td>
                <td style="width: 250px;">{{ task.Descripcion }}</td>
                <td>{{ task.Prioridad }}</td>
                <td>
                  <span :style="{ backgroundColor: colorPorEtiqueta(task.Etiqueta) }" class="etiqueta-color"></span>
                  {{ task.Etiqueta }}
                </td>
                <td>{{ task.Frecuencia }}</td>
                <td style="width: 180px;">
                  <button v-if="!task.complete"  @click="markAsCompleted(task)" class="completeTask button">
                    <img class="icon" src="./check.png" alt="Marcar tarea como realizada">
                  </button>
                  <button @click="deleteTask(task._id)" class="deleteTask button">
                    <img class="icon" src="./borrar.png" alt="Borrar tarea">
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <br>
         
        </div>
      </section>
  
      <section v-else class="no_tareas">
        <h2>NO SE CREARON TAREAS</h2>
      </section>
    </div>

    Nro de tareas {{this.tasks.length}}
    <br>
    Tareas completadas {{this.tareaCom}}
      <!--Botón eliminar todo prueba-->
      <section class="eliminar-todo-section">
        <button @click="eliminarTodo" class="eliminarTodo button">
          Eliminar Todo
        </button>
      </section>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        tasks: [],
        sortDirection: 1,
        sortBy: null,
        selectedEtiqueta: "", //NO LINE
        backend_server: 'http://127.0.0.1:3001',
        stats:null,
        completingTask:false,
        tareaCom:0
      }
    },
  created()
{
  this.obtenerEstadisticas();

},

    methods: {
    /*
      mostrartareas() {
        axios.get(this.backend_server + "/Tarea")
          .then(res => {
            this.tasks = res.data;
            this.filteredTasks = [...this.tasks];
          });
      },
    */
  mostrartareas() {
        axios.get(this.backend_server + "/Tarea")
          .then(res => {
            this.tasks = res.data;
          });
      },
      tareasRealizadas(){
        axios.get(this.backend_server + "/Tarea")
          .then(res => {
            this.tareaCom = res.data.length;
          });
        
      },
     // Filtrar por etiqueta
     filtrarPorEtiqueta() {
        if (this.selectedEtiqueta) {
          this.tasks = this.tasks.filter(task => task.Etiqueta === this.selectedEtiqueta);
        } else {
          this.mostrartareas();
        }
      },
  
      deleteTask(taskIndex) {
        var config_request={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
        axios.delete(this.backend_server + '/Tarea/' + taskIndex, {}, { config_request })
          .then(res => {                                         
            this.mostrartareas();
          })
          .catch((error) => {
            alert('NO SE PUDO ELIMINAR LA TAREA');
          }); 
      },
  
      ordenar(campo) {
        if (campo === this.sortBy) {
          this.sortDirection *= -1;
        } else {
          this.sortBy = campo;
          this.sortDirection = 1;
        }
  
        this.tasks.sort((a, b) => {
          if (typeof a[campo] === 'string') {
            return this.sortDirection * a[campo].localeCompare(b[campo]);
          }
          return this.sortDirection * (a[campo] - b[campo]);
        });
      },
  
      eliminarTodo() {
        const ids = this.tasks.map(task => task._id).join(',');
        var config_request={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'};
        axios.delete(`${this.backend_server}/TareaM/${ids}`, {}, { config_request })
          .then(res => {
            this.mostrartareas();
          })
          .catch((error) => {
            alert('No se encontraron elementos para eliminar');
          });
      },      

      colorPorEtiqueta(etiqueta) {
        switch (etiqueta) {
          case "Rojo (Personal)":
            return "#FF0000"; 
          case "Azul (Estudios)":
            return "#0000FF"; 
          case "Verde (Laboral)":
            return "#00FF00"; 
          default:
            return "#FFFFFF";
        }
      },


      
    async obtenerEstadisticas() {
      try {
        const response = await axios.get('/stats');
        this.stats = response.data;
      } catch (error) {
        console.error('Error al obtener estadísticas', error);
      }
    },

    markAsCompleted(dato) {
      console.log('Ingres');
      var config_request={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
        axios.put(`${this.backend_server}/Tarea/${dato._id}`, dato, { config_request })
          .then(res => {                                         
            
          })
          .catch((error) => {
            console.log(error)
          });  
          // URL de la página externa a la que deseas redireccionar
          const urlExterna = 'http://localhost:5173/';
          window.location.href = urlExterna;
  
},

    },//fin
  
    created() {
      this.mostrartareas();
      this.obtenerEstadisticas();
      this.tareasRealizadas();
      //const tareasCompletas = this.tasks.filter(dato => dato.complete===true);
      //console.log('no hay '+tareasCompletas);
      //this.tareaCom =tareasCompletas.length;
      //this.tareaCom=tareasCompletas;
      
    },
  };
  </script>
  
  <style lang="scss">
    .task-list-section {
      margin-top: 20px;
      max-height: 700px;
      overflow-y: auto; 
    }
    
    .tablaTareas {
      width: 100%;
      overflow-x: auto; 
    }
    
    .task-table {
      width: 100%;
      border-collapse: collapse;
      /*margin-top: 10px;*/
    }
    
    //grid de la tabla 
    .task-table th, .task-table td {
      border: 1px solid #64a713;//17A589
      
      text-align: left;
    }
    
    .task-table th {
      background-color: #f2f2f2;
    }
    
    .tiempo {
      align-self: start;
      margin-top: 20px;
    
      & h2 {
        text-align: end;
      }
    }
    
    .no_tareas {
      align-self: start;
      margin-top: 20px;
    
      & h2 {
        text-align: center;
      }
    }
    
    .completeTask,
    .deleteTask {
      background-color: #fcf8f2;
      color: #fff;
      cursor: pointer;
      border: none;
      border-radius: 2px;
      padding: 6px;
      margin-right: 3px;
      transition: background-color 0.3s;
    }
    
    .completeTask:hover,
    .deleteTask:hover {
      background-color:#fcf8f2;
    }
    
    .icon {
      width: 40px;
      margin-right: 0px;
    }
  
    .clickable {
    cursor: pointer;
    }
  
    .task-table .icon {
    width: 40px; //tamaño
    margin-right: 3px; // Espaciado
    }
  
    .etiqueta-color {
    width: 10px; 
    height: 10px; 
    display: inline-block;
    margin-right: 5px; 
    border: 1px solid #01581d; 
  }
  .task-table .cabecera-tarea {
    background-color: #f4660d;
    color: #fff; 
  }
  
  .eliminar-todo-section {
    text-align: center;
    margin-top: 20px;
    border-color:red;
    color:white;    }  
     
  </style>