<template>
  <div :key="route.fullPath">
    <div class="header">
      <h1>Videos</h1>
      <router-link :to="{name: 'Video toevoegen'}">Nieuwe video</router-link>
    </div>
    <ul class="module-list">
      <li class="module-list-item" v-for="(video, index) in videos" :key="video.id + '-' + video.module_id">
        <div class="module-list-item-left">
          <img :src="'http://localhost:8000' + video.thumbnail" alt="">
          <div>{{video.module.title}}: {{ video.title }}</div>
        </div>
        <div class="module-list-item-buttons">
          <div class="module-list-item-buttons-standard" v-if="!video.showconfirm">
            <router-link class="button-neutral" :to="{ name: 'Video bewerken', params: { video_id: video.id } }">Bewerken</router-link>
            <button class="button-deny" @click="video.showconfirm = true">Delete</button>
          </div>
          <div class="module-list-item-buttons-confirm" v-if="video.showconfirm">
            <span>Zeker weten?</span>
            <div class="module-list-item-buttons-confirm-buttons">
              <button class="button-confirm" @click="deleteVideo(video.id, index)">Ja!</button>
              <button class="button-deny" @click="video.showconfirm = false">Nee :(</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

const route = useRoute();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})


const videos = ref([])
async function getContent(){
  return (await axiosInstance.get('/videos/')).data
}

onBeforeMount(async () => {
  await getContent().then((data) => {
    videos.value = data
  })
})

function deleteVideo(id, index){
  axiosInstance.delete('video/delete', {
    data: {
      id: id
    }
  }).then((response) => {
    if(response.status === 200){
      videos.value.splice(index, 1)
    }
  })
}

</script>

<style scoped>

.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header a{
  color: black;
  text-decoration: none;
}

.module-list{
  list-style-type: none;
}

.module-list-item{
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 24px;
}

.module-list-item-left{
  display: flex;
  gap: 16px;
  align-items: center;
  grid-column: span 3 / span 4;
}

.module-list-item-buttons{
  display: flex;
  gap: 16px;
  align-items: center;
  grid-column: span 1 / span 4;
  width: 100%;
}

.module-list-item-buttons-standard{
  display: flex;
  gap: 16px;
}

.module-list-item img{
  width: 100%;
  max-width: 100px;
  height: auto;
}

.module-list-item-buttons-confirm{
  display: flex;
  flex-direction: column;
  width: 100%;
}


.module-list-item-buttons-confirm-buttons{
  display: flex;
  justify-content: space-between;
}

.button-confirm{
  border-radius: 5px;
  background-color: #2C9B22;
  padding: 5px 10px;
  color: white;
  font-weight: 500;
}

.button-neutral{
  border-radius: 5px;
  background-color: #3841a5;
  padding: 5px 10px;
  color: white;
  font-weight: 500;
  text-decoration: none;
}

.button-deny{
  border-radius: 5px;
  background-color: #d33643;
  padding: 5px 10px;
  color: white;
  font-weight: 500;
}

</style>
