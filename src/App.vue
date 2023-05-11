<template>
  <router-view />
  {{ message }}
</template>

<script setup>
  import axios from 'axios'
  import { onMounted, ref } from 'vue';

  let message = ref([])

  axios.defaults.baseURL = 'http://127.0.0.1:80/api/';
  onMounted(() => {
    axios.get('/test').then((res) => {
      console.log(res)
      message.value = ""
    })
    .catch((error) => {
      console.log(error.res);
    });
  });
</script>
<style>
body{
  font-family: 'Poppins', sans-serif;
}
</style>
