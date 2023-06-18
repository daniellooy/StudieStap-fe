<template>
  <div class="formwrapper">
    <h1>Module {{ editmode ? 'bewerken' : 'toevoegen'}}</h1>

    <div class="form">
      <div class="form-group" >
        <img v-if="editmode" :src="endpoint + module.thumbnail" alt="">
        <label for="thumb">Thumbnail afbeelding</label>
        <input id="file" @change="onFileChange($event)" type="file" >
      </div>
      <div class="form-group">
        <label for="title">Titel</label>
        <input type="text" v-model="module.title" name="title">
      </div>
      <div class="form-group">
        <label for="description">Beschrijving</label>
        <textarea v-model="module.description" name="description"/>
      </div>
      <div class="form-group">
        <label for="module">Categorie</label>
        <select @change="onCategoryChange($event)" name="module" id="">
          <option :selected="editmode && module.learningcategory_id === category.id" v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.title }}
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
const module = ref({})
const errors = ref({});
const file = ref(null);
const editmode = ref(false);
const chosen_category = ref(1);
const categories = ref({});
const endpoint = import.meta.env.VITE_API_ENDPOINT

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + '/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});

if(route.params.module_id !== undefined){
  editmode.value = true;
}

axiosInstance.get('/categories').then((response)=>{
  categories.value = response.data
})

if(editmode.value){
  axiosInstance.get('/module/' + route.params.module_id).then((response) => {
    module.value = response.data;
    chosen_category.value = response.data.learningcategory_id
  })
}
else{
  module.value.title = ''
  module.value.description = ''
  module.value.thumbnail = ''
}

function save(){
  if(editmode.value){
    let data = new FormData();
    data.append('id', module.value.id);
    data.append('title', module.value.title)
    data.append('description', module.value.description)
    data.append('learningcategory_id', chosen_category.value)
    data.append('thumbnail', file.value)
    data.append('_method', 'PUT')
    axiosInstance.post('/module/edit', data).then((response) => {console.log(response)})
    router.push({name: 'Admin Modules Overzicht'});
  }
  else{
    let data = new FormData();
    data.append('title', module.value.title)
    data.append('description', module.value.description)
    data.append('learningcategory_id', chosen_category.value)
    data.append('thumbnail', file.value)
    axiosInstance.post('/module/add', data).then((response) => {console.log(response)})
    router.push({name: 'Admin Modules Overzicht'});
  }
}

function cancel(){
  confirm('Zeker weten?')
  router.push({name: 'Admin Modules Overzicht'});
}

function onCategoryChange(e){
  console.log(e.target.value);
  chosen_category.value = e.target.value
}

function onFileChange(e){
  file.value = e.target.files[0]
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

.form input, textarea{
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
