<template>
  <div class="formwrapper">
    <h1>Channel {{ editmode ? 'bewerken' : 'toevoegen' }}</h1>
    <div class="form">
      <div class="form-section">

        <div class="form-group">
          <div class="form-image-wrapper">
            <img
              :src="[channelImage ? channelImage : channel.image_path ? ('http://localhost:8000/' + channel.image_path) : 'https://cataas.com/cat']"
              alt="">
            <label for="channel-image">+</label>
          </div>
          <input class="hidden" id="channel-image" @change="onImageChange($event)" type="file">
        </div>
        <div class="form-group">
          <label for="title">Titel</label>
          <input type="text" v-model="channel.name" name="title">
        </div>
      </div>
      <div class="form-group">
        <label for="description">Beschrijving</label>
        <textarea v-model="channel.description" name="description" />
      </div>
      <div class="form-buttons">
        <button @click="cancel()">Annuleren</button>
        <button @click="save()">Opslaan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, reactive } from "vue";
const route = useRoute();
const router = useRouter();
const channel = ref({});
const editmode = ref(route.params.channel_id ? true : false);
const channelImage = ref('');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});



if (editmode.value) {
  axiosInstance.get('/channel/' + route.params.channel_id).then((response) => {
    channel.value = response.data
  })
}
else {
  channel.value.name = ''
  channel.value.description = ''
  channel.value.imageFile = ''
  channel.value.users = []
}

const onImageChange = (event) => {
  const file = event.target.files[0]
  console.log(file)
  channel.value.imageFile = file
  channelImage.value = URL.createObjectURL(file)
}

const save = () => {
  if(editmode.value){
    let data = new FormData();
    data.append('id', channel.value.id);
    data.append('name', channel.value.name)
    data.append('description', channel.value.description)
    data.append('image_file', channel.value.imageFile)
    data.append('_method', 'PUT')
    axiosInstance.post('/channel/update', data).then((response) => {console.log(response)})
    router.push({name: 'Channel Overzicht'});
  }
  else{
    let data = new FormData();
    data.append('name', channel.value.name)
    data.append('description', channel.value.description)
    data.append('image_file', channel.value.imageFile)
    axiosInstance.post('/channel/add', data).then((response) => {console.log(response)})
    router.push({name: 'Channel Overzicht'});
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-section {
  display: flex;
  gap: 16px;
}

.form-image-wrapper {
  position: relative;
  width: 125px;

}

.form-image-wrapper>img {
  height: 125px;
  width: inherit;
  aspect-ratio: 4/3;
  max-width: fit-content;
  border-radius: 100%;
}

.form-image-wrapper>label {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #2C9B22;
  color: white;
  border-radius: 100%;
  width: 32px;
  height: 32px;
  padding: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  border: 1px solid #2C9B22;
}

.form-image-wrapper>label:hover {
  background-color: white;
  color: #2C9B22;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
}

.formwrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form input,
textarea,
select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #999;
}

.form textarea {
  height: 150px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}</style>