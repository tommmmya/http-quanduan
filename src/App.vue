<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
<template>
  <div class="container">
<router-view></router-view>
  </div>
</template>


<style>
*{
  padding: 0;
  margin: 0;
}

.container{
height:100vh;
overflow-y: hidden;
}
li{
  list-style: none;
}
</style>
