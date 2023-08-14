<script setup>
   import { RouterView } from 'vue-router';
   import NavBar  from './components/NavBar.vue';
</script>

<template>
   <NavBar />
   <br/>
   <div class="container" id="divPrincipal">
      <RouterView />
   </div>   
</template>

<style>
   *{
      font-family: Helvetica;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      
   }
   #divPrincipal{
      background-color: #E0E0E0;
   }

</style>