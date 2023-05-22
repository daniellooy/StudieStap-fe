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
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
  max-width: 768px;
  width: 100%;
}
</style>
