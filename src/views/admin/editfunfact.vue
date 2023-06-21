<template>
  <div class="wrapper-inner">
    <div class="formwrapper">
      <h1>Leuk feitje bewerken</h1>

      <div class="form">
        <div class="form-group">
          <label for="description">Feitje</label>
          <textarea v-model="funfact.fact" name="description"/>
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
  baseURL: import.meta.env.VITE_API_ENDPOINT + '/api/',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});

const router = useRouter();

const funfact = ref({})

axiosInstance.get('funfact').then((response)=>{
  funfact.value = response.data
})

function cancel(){
  confirm('Zeker weten?')
  router.push({name: 'Admin overzicht'});
}

function save(){
  axiosInstance.post('/funfact/edit', {
    fact: funfact.value.fact,
    _method: 'PUT'
  }).then((response) => {
    console.log(response);

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
