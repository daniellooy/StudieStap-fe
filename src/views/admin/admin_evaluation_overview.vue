<template>
  <div>
    <div class="header">
      <h1>Evaluaties</h1>
      <router-link :to="{name: 'Evaluatie toevoegen'}">Nieuwe evaluatie</router-link>
    </div>
    <ul class="module-list">
      <li class="module-list-item" v-for="(evaluation, index) in evaluations" :key="evaluation.id">
        <div class="module-list-item-left">
          <div>{{ evaluation.user.firstname }} {{ evaluation.user.lastname }}: {{ evaluation.title }}</div>
        </div>
        <div class="module-list-item-buttons">
          <div class="module-list-item-buttons-standard" v-if="!evaluation.showconfirm">
            <router-link class="button-neutral" :to="{ name: 'Evaluatie bewerken', params: { evaluation_id: evaluation.id } }">Bewerken</router-link>
            <button class="button-deny" @click="evaluation.showconfirm = true">Delete</button>
          </div>
          <div class="module-list-item-buttons-confirm" v-if="evaluation.showconfirm">
            <span>Zeker weten?</span>
            <div class="module-list-item-buttons-confirm-buttons">
              <button class="button-confirm" @click="deleteCategory(evaluation.id, index)">Ja!</button>
              <button class="button-deny" @click="evaluation.showconfirm = false">Nee :(</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onBeforeMount, onUpdated, ref} from "vue";
import axios from "axios";

const evaluations = ref([]);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

function deleteCategory(id, index) {
  axiosInstance.delete('evaluations/delete', {
    data: {
      id: id
    }
  }).then((response) => {
    if(response.status === 200){
      evaluations.value.splice(index, 1)
    }
  })
}

async function getContent(){
  return (await axiosInstance.get('/evaluations/')).data
}

onBeforeMount(async () => {
  await getContent().then((data) => {
    console.log(data)
    evaluations.value = data
  })
})

</script>

<style scoped>

.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header a{
  color: black;
  text-decoration: none;
}

.module-list{
  list-style-type: none;
}

.module-list-item{
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 24px;
}

.module-list-item-left{
  display: flex;
  gap: 16px;
  align-items: center;
  grid-column: span 3 / span 4;
}

.module-list-item-buttons{
  display: flex;
  gap: 16px;
  align-items: center;
  grid-column: span 1 / span 4;
  width: 100%;
}

.module-list-item-buttons-standard{
  display: flex;
  gap: 16px;

}

.module-list-item img{
  width: 100%;
  max-width: 100px;
  height: auto;
}

.module-list-item-buttons-confirm{
  display: flex;
  flex-direction: column;
  width: 100%;
}


.module-list-item-buttons-confirm-buttons{
  display: flex;
  justify-content: space-between;
}

.button-confirm{
  border-radius: 5px;
  background-color: #2C9B22;
  padding: 5px 10px;
  color: white;
  font-weight: 500;
}

.button-neutral{
  border-radius: 5px;
  background-color: #3841a5;
  padding: 5px 10px;
  color: white;
  font-weight: 500;
  text-decoration: none;
}

.button-deny{
  border-radius: 5px;
  background-color: #d33643;
  padding: 5px 10px;
  color: white;
  font-weight: 500;
}

</style>
