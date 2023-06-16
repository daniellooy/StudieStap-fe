<template>
  <div class="overview-wrapper">
    <module_list :modules="category.modules" :description="category.description" :title="category.title" v-for="category in categories" />
  </div>
</template>

<script setup>
import Module_list from "@/components/zelfstudie/module_list.vue";
import axios from "axios";
import {ref} from "vue";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

let categories = ref(null)

axiosInstance.get('/api/categories')
  .then((response) => {
  categories.value = response.data
  })
  .catch((error) => {
    console.log(error);
  });

</script>

<style scoped>
.overview-wrapper{
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
