
<template>
  <div>
   <nav class="addTask">
     <a href="/" class="titulo-pagina" style="font-size: 30px;color: #fff;">ORGANIZA TU DÍA A DÍA CON... EVERYDAY</a>
  </nav>
   
</div>
 <div id="app">
    <div style="padding: 30px;background-color: #fcf8f2;">
      <table border="0" cellpadding="0" :cellspacing="0">
      <tr>
        <td valign="top"><PruebaComponent/></td>
        <td valign="top"  style="background-color: #fcf8f2;"><TareasComponent/></td>
      </tr>
    </table>
    </div>
    
 </div>
</template>

<style lang="scss">

.titulo-pagina {
  background-color: #00972b; /* #39a070; */
  padding: 10px; 
  color: #ffffff; 
}
</style>


<script>
//import DataComponent from './components/DataComponent.vue';
//import EverydayComponent from './components/EverydayComponent.vue';
//import UsuariosComponent from './components/UsuariosComponent.vue';
import PruebaComponent from './components/PruebaComponent.vue';
import TareasComponent from './components/TareasComponent.vue';

export default {
 name: 'App',
 components: {
   //EverydayComponent,
   //DataComponent,
   //UsuariosComponent,
   PruebaComponent,
   TareasComponent
}
}
</script>

