<template>
  <div class="sidebar">
    <div class="sidebar-inner">
      <h3 class="sidebar-title">Content in deze module</h3>
      <ul class="sidebar-list">
        <li v-for="module_video in module_videos" v-bind:key="module_video.id" >
          <ul>
            <router-link :to="{ name: 'Video', params: { video_id: module_video.id } }">
              <li class="sidebar-item" :class="[module_video.id === video_id && !question ? 'darkbg': '']">
                <img class="sidebar-item-thumbnail" :src="'http://localhost:8000' + module_video.thumbnail" alt="">
                <span>{{ module_video.title }}</span>
              </li>
            </router-link>
            <router-link v-for="(question, index) in module_video.questions" v-bind:key="question.id" :to="{name: 'Vraag', params: {question_id: question.id}}">
              <li class="sidebar-item" :class="[module_video.id === video_id && this.question ? 'darkbg': '']" >
                Vraag {{ index + 1 }}
              </li>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, toRefs} from "vue";
import axios from "axios";
const module_videos = ref([]);

const props = defineProps({
  video_id: Number,
  question: Boolean,
})

const {video_id, question} = toRefs(props)


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

axiosInstance.get('/api/video/' + video_id.value).then((response) => {
  module_videos.value = [...response.data.module.videos]
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
  gap: 16px;
  align-items: center;
}

.darkbg{
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
</style>
