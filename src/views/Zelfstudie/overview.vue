<template>
  <div class="overview-wrapper">
    <module_list :modules="modules" title="Alle modules" />
  </div>
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
.overview-wrapper{
  background-color: white;
  border-radius: 20px;
  padding: 25px;
}
</style>
