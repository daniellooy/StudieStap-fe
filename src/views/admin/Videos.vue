<template>
  <div class="wrapper-inner">
    <router-view :key="route.fullPath"
    ></router-view>
  </div>
</template>

<script setup>

import {useRoute} from "vue-router";

const route = useRoute();

</script>

<style scoped>
.wrapper-inner{
  padding: 25px;
  background-color: white;
  border-radius: 20px;
  margin: 0 auto;
  max-width: 768px;
  width: 100%;
}
</style>
