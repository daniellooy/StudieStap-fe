<template>
  <div class="wrapper-inner">
    <div class="formwrapper">
      <h1>Leuk feitje bewerken</h1>
      <div class="form">
        <div class="form-group">
          <label for="description">Module</label>
          <select name="module" @change="changeChosenModule($event)" id="">
            <option :selected="module.id == featuredmodule.id" :value="module.id" v-for="module in modules">
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
  </div>
</template>

<script setup>

import axios from "axios";
import {ref} from "vue";

import {useRouter} from "vue-router";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});

const router = useRouter();
const featuredmodule = ref({})
const modules = ref([])
const chosenmodule = ref(null)

axiosInstance.get('/featuredmodule').then((response)=>{
  console.log(response)
  featuredmodule.value = response.data
})

axiosInstance.get('/modules').then((response)=>{
  modules.value = response.data
})

function cancel(){
  confirm('Zeker weten?')
  router.push({name: 'Admin overzicht'});
}

function changeChosenModule(e){
  chosenmodule.value = e.target.value
}

function save(){
  axiosInstance.post('/featuredmodule/edit', {
    module_id: chosenmodule.value,
    _method: 'PUT'
  }).then((response) => {
    console.log(response)
    router.push({name: 'Admin overzicht'});
  })
}
</script>

<style scoped>
.wrapper-inner{
  padding: 25px;
  background-color: white;
  border-radius: 20px;
  margin: 0 auto;
  max-width: 768px;
  width: 100%;
}

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
