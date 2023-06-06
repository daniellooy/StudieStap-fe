<template>
  <div class="formwrapper">
    <h1>Rubric {{ editmode ? 'bewerken' : 'toevoegen'}}</h1>

    <div class="form">
      <div class="form-group">
        <label for="title">Titel</label>
        <input type="text" v-model="rubric.title" name="title">
      </div>
      <div class="form-group">
        <label for="description">Beschrijving</label>
        <textarea v-model="rubric.description" name="description"/>
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
const rubric = ref({})
const errors = ref({});
const editmode = ref(false);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
  }
});

if(route.params.rubric_id !== undefined){
  editmode.value = true;
}

if(editmode.value){
  axiosInstance.get('/rubrics/' + route.params.rubric_id).then((response) => {
    rubric.value = response.data
  })
}
else{
  rubric.value.title = ''
  rubric.value.description = ''
}

function save(){
  if(editmode.value){
    let data = new FormData();
    data.append('id', rubric.value.id);
    data.append('title', rubric.value.title)
    data.append('description', rubric.value.description)
    data.append('_method', 'PUT')
    axiosInstance.post('/rubrics/edit', data).then((response) => {console.log(response)})
    router.push({name: 'Admin Rubrics Overzicht'});
  }
  else{
    let data = new FormData();
    data.append('title', rubric.value.title)
    data.append('description', rubric.value.description)
    axiosInstance.post('/rubrics/add', data).then((response) => {console.log(response)})
    router.push({name: 'Admin Rubrics Overzicht'});
  }
}

function cancel(){
  confirm('Zeker weten?')
  router.push({name: 'Admin Rubrics Overzicht'});
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
