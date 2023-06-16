<template>
  <div class="overview-wrapper">
    <h2 class="video-list-title">
      Module: {{ module.title }}
    </h2>
    <p>
      {{ module.description }}
    </p>
    <ul class="video-list">
      <video_list_item v-for="video in module.videos" :key="video.id" :video="video"/>
    </ul>
  </div>
</template>

<script setup>
import axios from "axios";
import Video_list_item from "@/components/zelfstudie/video_list_item.vue";
import {useRoute} from "vue-router";
import {ref} from "vue";
const route = useRoute();
const module = ref({});

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + '/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

axiosInstance.get('/module/' + route.params.module_id).then((response) => {
  console.log(response.data)
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

.overview-wrapper{
  background-color: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
