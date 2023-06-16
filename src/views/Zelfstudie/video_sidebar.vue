<template>
  <div class="sidebar">
    <div class="sidebar-inner">
      <h3 class="sidebar-title">Content in deze module</h3>
      <ul class="sidebar-list">
        <li v-for="module_video in module_videos" v-bind:key="module_video.id" >
          <ul>
            <router-link active-class="darkbg" :to="{ name: 'Video', params: { video_id: module_video.id } }">
              <li class="sidebar-item" :class="[module_video.completed ? 'completed':'']">
                <div class="sidebar-item-left">
                  <img class="sidebar-item-thumbnail" :src="endpoint + module_video.thumbnail" alt="">
                  <span>{{ module_video.title }}</span>
                </div>
                <span class="completed-check" v-if="module_video.completed">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="30" width="30">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </li>
            </router-link>
            <router-link active-class="darkbg" v-for="(question, index) in module_video.questions" v-bind:key="question.id" :to="{name: 'Vraag', params: {question_id: question.id}}">
              <li class="sidebar-item" :class="[question.answered ? 'completed':'']">
                <span class="sidebar-item-left">Vraag {{ index + 1 }}</span>
                <span class="completed-check" v-if="question.answered">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="30" width="30">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </li>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, ref, toRefs} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
const module_videos = ref([]);
const route = useRoute();
const endpoint = import.meta.env.VITE_API_ENDPOINT;

const props = defineProps({
  video_id: Number,
})

const {video_id} = toRefs(props)

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

async function getContent(){
  return (await axiosInstance.get('/api/video/' + video_id.value)).data
}

onBeforeMount(async () => {
  await getContent().then((data) => {
    console.log(data)
    module_videos.value = data.module.videos
  })
})

</script>

<style scoped>

.sidebar-inner{
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
}

.sidebar-title{
  padding: 20px;
  border-bottom: 1px solid #E0DDCF;
}

.sidebar-item{
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-item-left{
  display: flex;
  gap: 16px;
  align-items: center;
}

.darkbg li{
  background-color: #F5F6F4;
}

.sidebar-list a{
  text-decoration: none;
  color: black;
}

.sidebar-item-thumbnail{
  width: 80px;
  object-fit: cover;
  height: auto;
  aspect-ratio: 4/3;
}

.sidebar ul{
  list-style-type: none;
}

.completed{
  background-color: #2C9B22 !important;
  color: white;
}

.completed-check{
  align-self: center;
  align-items: center;
  display: flex;
}
</style>
