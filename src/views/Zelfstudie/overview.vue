<template>
  <module_list :modules="modules" title="Alle modules" />
</template>

<script setup>
import Module_list from "@/components/zelfstudie/module_list.vue";
import axios from "axios";
import {ref} from "vue";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

let modules = ref(null)
axiosInstance.get('/api/modules')
  .then((response) => {
  modules.value = response.data
  })
  .catch((error) => {
    console.log(error);
  });

</script>

<style scoped>

</style>
