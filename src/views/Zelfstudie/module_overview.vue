<template>
  <h2 class="video-list-title">
    Module: {{ module.title }}
  </h2>
  <ul class="video-list">
    <video_list_item v-for="video in module.videos" :key="video.id" :video="video"/>
  </ul>
</template>

<script setup>
import axios from "axios";
import Video_list_item from "@/components/zelfstudie/video_list_item.vue";
import {useRoute} from "vue-router";
import {ref} from "vue";
const route = useRoute();
const module = ref({});

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

axiosInstance.get('/module/' + route.params.module_id).then((response) => {
  module.value = response.data
})

</script>

<style scoped>
.video-list{
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 24px;
  margin-top: 24px;
}
</style>
