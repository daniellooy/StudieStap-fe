<template>
  <div>
    <ul class="channel__list">
      <li  v-for="channel in channels" :key="channel.id" >
        <!-- show image of the channel  -->
        <div :class="[channel.users.find((user2) => user2.user_id === user.id) ? 'channel__list__item' : 'disabled channel__list__item' ]" @click="getSelected(channel.id)">
          <svg v-if="selectedChannel === channel.id" width="5" height="50" viewBox="0 0 5 50" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0C2.76142 0 5 2.23858 5 5V45C5 47.7614 2.76142 50 0 50V0Z" fill="#2C9B22" />
        </svg>
        <div >{{ channel.name }}</div>
        <img class="wrapper__item" :src="URL_BASE + channel.image_path">
      </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { inject } from 'vue';
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/store";

const store = useAppStore()
const { user } = storeToRefs(store)

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
    console.log(response.data)
    channels.value = response.data
  })
  .catch((error) => {
    console.log(error)
  })

</script>

<style scoped>
.channel__list {
  padding: 8px;
  list-style: none;
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
.disabled {
  color: #ccc;
  cursor: not-allowed !important;
  pointer-events: none;
}
</style>