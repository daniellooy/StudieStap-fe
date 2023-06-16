<template>
  <div class="formwrapper">
    <h1>Video {{ editmode ? 'bewerken' : 'toevoegen'}}</h1>

    <div class="form">
      <div class="form-group" >
        <img v-if="editmode" :src="'http://localhost:8000' + video.thumbnail" alt="">
        <label for="thumb">Thumbnail afbeelding</label>
        <input id="file" @change="onFileChange($event)" type="file" >
      </div>
      <div class="form-group" >
        <video controls v-if="editmode" :src="'http://localhost:8000' + video.file_path" alt="" />
        <label for="thumb">Video</label>
        <input id="file" @change="onVideoChange($event)" type="file" >
      </div>
      <div class="form-group">
        <label for="title">Titel</label>
        <input type="text" v-model="video.title" name="title">
      </div>
      <div class="form-group">
        <label for="description">Beschrijving</label>
        <textarea v-model="video.description" name="description"/>
      </div>
      <div class="form-group">
        <label for="module">Module</label>
        <select @change="onModuleChange($event)" name="module" id="">
          <option :selected="editmode && video.module_id === module.id" v-for="module in modules" :key="module.id" :value="module.id">
            {{ module.title }}
          </option>
        </select>
      </div>
      <div class="form-buttons">
        <button @click="cancel()">Annuleren</button>
        <button @click="save()">Opslaan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {ref} from "vue";
const route = useRoute();
const router = useRouter();
const video = ref({})
const modules = ref({})
const errors = ref({});
const file = ref(null);
const editmode = ref(false);
const video_file = ref('');
const chosen_module = ref(1);


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});

if(route.params.video_id !== undefined){
  editmode.value = true;
}

axiosInstance.get('/modules').then((response)=>{
  modules.value = response.data
})

if(editmode.value){
  axiosInstance.get('/video/' + route.params.video_id).then((response) => {
    video.value = response.data.video
    chosen_module.value = response.data.video.module_id
  })

}
else{
  video.value.title = ''
  video.value.description = ''
  video.value.thumbnail = ''
}

function save(){
  if(editmode.value){
    let data = new FormData();
    data.append('id', video.value.id);
    data.append('title', video.value.title)
    data.append('description', video.value.description)
    data.append('module_id', chosen_module.value)
    data.append('video_file', video_file.value)
    data.append('thumbnail', file.value)
    data.append('_method', 'PUT')
    axiosInstance.post('/video/edit', data).then((response) => {console.log(response)})
    router.push({name: 'Admin Videos Overzicht'});
  }
  else{
    let data = new FormData();
    data.append('title', video.value.title)
    data.append('description', video.value.description)
    data.append('module_id', chosen_module.value)
    data.append('video_file', video_file.value)
    data.append('thumbnail', file.value)
    axiosInstance.post('/video/add', data).then((response) => {console.log(response)})
    router.push({name: 'Admin Videos Overzicht'});
  }
}

function cancel(){
  confirm('Zeker weten?')
  router.push({name: 'Admin Videos Overzicht'});
}

function onFileChange(e){
  file.value = e.target.files[0]
}

function onModuleChange(e){
  console.log(e.target.value);
  chosen_module.value = e.target.value
}

function onVideoChange(e){
  video_file.value = e.target.files[0]
}

</script>

<style scoped>
.form{
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group{
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label{
  font-weight: 500;
}

.form-group img{
  height: 125px;
  width: auto;
  aspect-ratio: 4/3;
  max-width: fit-content;
}

.formwrapper{
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form input, textarea, select{
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #999;
}

.form textarea{
  height: 150px;
}

.form-buttons{
  display: flex;
  justify-content: space-between;
}

</style>
