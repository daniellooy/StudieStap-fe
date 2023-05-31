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
    <video_sidebar :video_id="video_id" />
<!--    <div class="sidebar">-->
<!--      <div class="sidebar-inner">-->
<!--        <h3 class="sidebar-title">Content in deze module</h3>-->
<!--        <ul class="sidebar-list">-->
<!--          <li v-for="module_video in module_videos" v-bind:key="module_video.id" >-->
<!--            <ul>-->
<!--              <router-link :to="{ name: 'Video', params: { video_id: module_video.id } }">-->
<!--                <li class="sidebar-item" :class="[module_video.id === video.id ? 'darkbg': '']">-->
<!--                  <img class="sidebar-item-thumbnail" :src="'http://localhost:8000' + module_video.thumbnail" alt="">-->
<!--                  <span>{{ module_video.title }}</span>-->
<!--                </li>-->
<!--              </router-link>-->
<!--              <router-link v-for="(question, index) in module_video.questions" v-bind:key="question.id" :to="{name: 'Vraag', params: {question_id: question.id}}">-->
<!--                <li class="sidebar-item" >-->
<!--                  Vraag {{ index + 1 }}-->
<!--                </li>-->
<!--              </router-link>-->
<!--            </ul>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup>
import axios from "axios";
import {onBeforeMount, ref, watch} from "vue";
import {useRoute} from "vue-router";
import Video_sidebar from "@/views/Zelfstudie/video_sidebar.vue";

const route = useRoute();
const video_id = ref(route.params.video_id);
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
  return (await axiosInstance.get('/api/video/' + id)).data
}


onBeforeMount(async () => {
  await getContent(route.params.video_id).then((data) => {
    video.value = data.video
    module_videos.value = [...data.module.videos]
    video_id.value = data.video.id
  })
})


watch(
  () => route.params.video_id,
  (newId, oldId) => {
    getContent(route.params.video_id).then((data) => {
      video.value = data.video
      module_videos.value = [...data.module.videos]
      video_id.value = data.video.id
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
  height: min-content;
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
  overflow: hidden;
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

.darkbg{
  background-color: #F5F6F4;
}

.question{
  min-height: 100%;
  max-height: 80vh;
  padding: 20px;
}

</style>
