<template>
  <div class="videowrapper" :key="route.params.video_id">
    <div class="videowrapper-contentholder">
      <video :src="'http://localhost:8000' + video.file_path" controls>

      </video>
      <div class="videowrapper-text">
        <h2 class="video-title">{{ video.title }}</h2>
        <p>
          {{ video.description }}
        </p>
      </div>
    </div>
    <div class="sidebar">
      <div class="sidebar-inner">
        <h3 class="sidebar-title">Andere videos in deze module</h3>
        <ul class="sidebar-list">
          <router-link v-for="module_video in module_videos" v-bind:key="module_video.id" :to="{ name: 'Video', params: { video_id: module_video.id } }">
            <li class="sidebar-item"  >
              <img class="sidebar-item-thumbnail" :src="'http://localhost:8000' + module_video.thumbnail" alt="">
              <span>{{ module_video.title }}</span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {onBeforeMount, onBeforeUpdate, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
const route = useRoute();

const video = ref({});
const module_videos = ref([]);
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

async function getContent(id){
  const response = (await axiosInstance.get('/api/video/' + id)).data
  return response
}

onBeforeMount(async () => {
  await getContent(route.params.video_id).then((data) => {
    video.value = data.video
    module_videos.value = [...data.module.videos]
  })
})


watch(
  () => route.params.video_id,
  (newId, oldId) => {
    getContent(route.params.video_id).then((data) => {
      video.value = data.video
      module_videos.value = [...data.module.videos]
    })
  }
)

</script>



<style scoped>
.videowrapper{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.videowrapper-contentholder{
  grid-column: span 2 / span 3;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
}

.videowrapper video{
  border: 1px solid black;
  border-radius: 20px 20px 0px 0px;
  width: 100%;
}

.videowrapper-text{
  padding: 20px;
}

.video-title{
  text-transform: capitalize;
}

.sidebar-inner{
  background-color: white;
  border-radius: 20px;
}

.sidebar-list{
  margin-top: 10px;
}

.sidebar-title{
  padding: 20px;
  border-bottom: 1px solid #E0DDCF;
}

.sidebar-item{
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: center;
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

</style>
