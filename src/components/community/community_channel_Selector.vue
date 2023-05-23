<template>
    <div>
        selector
        <ul>
            <li v-for="channel in channels" :key="channel.id" @click="getSelected(channel.channel_id)">{{ channel.channel_id }}</li>
        </ul>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { inject } from 'vue';

const updateSelectedChannel = inject('updateSelectedChannel');


const channels = ref();

const getSelected = (value) => {
    updateSelectedChannel(value)
    console.log(value)
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
</style>