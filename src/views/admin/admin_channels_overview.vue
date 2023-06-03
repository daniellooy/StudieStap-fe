<template>
    <div :key="route.fullPath">
        <div class="header">
            <h1>Channel overzicht</h1>
            <router-link :to="{ name: 'Channel toevoegen' }">Channel Toevoegen</router-link>
        </div>
        <ul class="channel__list">
            <li class="channel__list__item" v-for="channel,index in channels" :key="channel">
                <div class="channel__list__item__left">
                    <img :src="'http://localhost:8000/' + channel.image_path" alt="">
                    <div><Strong>{{ channel.name }}: </Strong>{{ channel.description }}</div>
                </div>
                <div class="channel__list__item__buttons">
                    <div class="channel__list__item__buttons__standard" v-if="!channel.showconfirm">
                        <router-link class="button__neutral"
                            :to="{ name: 'Channel bewerken', params: { channel_id: channel.id } }">Bewerken</router-link>
                        <button class="button__deny" @click="channel.showconfirm = true">Delete</button>
                    </div>
                    <div class="channel__list__item__buttons__confirm" v-if="channel.showconfirm">
                        <span>Zeker weten?</span>
                        <div class="channel__list__item__buttons__confirm__buttons">
                            <button class="button__confirm" @click="deleteChannel(channel.id, index)">Ja!</button>
                            <button class="button__deny" @click="channel.showconfirm = false">Nee :(</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup name="Channel Overzicht">
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { useRoute } from "vue-router";

const route = useRoute();
const channels = ref([]);
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
    headers: {
        "accept": 'application/json',
        "content-type": "application/json"
    }
})

async function getChannels() {
    return (await axiosInstance.get('/channels')).data
}
onBeforeMount(async () => {
    await getChannels().then((data) => {
        channels.value = data
    })
})

function deleteChannel(id, index) {
  axiosInstance.delete('channel/delete', {
    data: {
      id: id
    }
  }).then((response) => {
    if(response.status === 200){
      channels.value.splice(index, 1)
    }
  })
}


</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header a {
    color: black;
    text-decoration: none;
}

.channel__list {
    list-style-type: none;
}

.channel__list__item {
    padding: 10px 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: 24px;
}

.channel__list__item__left {
    display: flex;
    gap: 16px;
    align-items: center;
    grid-column: span 3 / span 4;
}

.channel__list__item__buttons {
    display: flex;
    gap: 16px;
    align-items: center;
    grid-column: span 1 / span 4;
    width: 100%;
}

.channel__list__item__buttons__standard {
    display: flex;
    gap: 16px;
}

.channel__list__item img {
    width: 100%;
    max-width: 100px;
    height: auto;
}

.channel__list__item__buttons__confirm {
    display: flex;
    flex-direction: column;
    width: 100%;
}


.channel__list__item__buttons__confirm__buttons {
    display: flex;
    justify-content: space-between;
}

.button__confirm {
    border-radius: 5px;
    background-color: #2C9B22;
    padding: 5px 10px;
    color: white;
    font-weight: 500;
}

.button__neutral {
    border-radius: 5px;
    background-color: #3841a5;
    padding: 5px 10px;
    color: white;
    font-weight: 500;
    text-decoration: none;
}

.button__deny {
    border-radius: 5px;
    background-color: #d33643;
    padding: 5px 10px;
    color: white;
    font-weight: 500;
}
</style>