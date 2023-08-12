<script setup>
   import { RouterView } from 'vue-router';
   import NavBar  from './components/NavBar.vue';
</script>

<template>
   <NavBar />
   <br/>
   <div class="container">
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
</style>