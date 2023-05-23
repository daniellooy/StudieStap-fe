<template>
  <div>
    <ul class="channel__list">
      <li class="channel__list__item" v-for="channel in channels" :key="channel.id"
        @click="getSelected(channel.channel_id)">
        <!-- show image of the channel  -->
        <svg v-if="selectedChannel === channel.channel_id" width="5" height="50" viewBox="0 0 5 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0C2.76142 0 5 2.23858 5 5V45C5 47.7614 2.76142 50 0 50V0Z" fill="#D9D9D9" />
        </svg>
        <img :src="URL_BASE + channel.channel.image_path">
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { inject } from 'vue';

const updateSelectedChannel = inject('updateSelectedChannel');
const channels = ref();
const URL_BASE = 'http://localhost:8000/'

const props = defineProps({
  selectedChannel: {
    type: Number
  }
})

const getSelected = (value) => {
  updateSelectedChannel(value)
}



const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

axiosInstance.get('/channels')
  .then((response) => {
    channels.value = response.data
  })
  .catch((error) => {
    console.log(error)
  })

</script>

<style scoped>
.channel__list{
  padding: 8px;
}
.channel__list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  flex-direction: row;
  overflow: hidden;
  cursor: pointer;
}

.channel__list__item>img {
  width: 50px;
  height: 50px;

  border-radius: 100%;
}
</style>