<template>
  <div class="formwrapper">
    <h1>Evaluatie {{ editmode ? 'bewerken' : 'toevoegen'}}</h1>
    <div class="form">
      <div class="form-group">
        <label for="title">Titel</label>
        <input type="text" v-model="evaluation.title" name="title">
      </div>
      <div class="form-group">
        <label for="module">Studiestapper</label>
        <select @change="onUserChange($event)" id="">
          <option :selected="editmode && user.id === evaluation.user_id" v-for="user in users" :key="user.id" :value="user.id">
            {{ user.firstname }} {{ user.lastname }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <ul class="answer-list">
          <li class="answer-list-item">
            <span class="answer-list-item-textwrapper">
              <strong>Rubric</strong>
            </span>
            <span class="answer-list-item-checkboxwrapper">
              <strong>Score</strong>
            </span>
          </li>
          <li class="answer-list-item" v-for="score in evaluation.scores" :key="score.id">
            <span class="answer-list-item-textwrapper">
                {{ score.rubric.title }}
            </span>
            <span class="answer-list-item-checkboxwrapper">
              <input class="answer-list-item-checkbox" type="text" v-model="score.score">
            </span>
          </li>
        </ul>
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
import {ru} from "vuetify/locale";
const route = useRoute();
const router = useRouter();
const evaluation = ref({})
const errors = ref({});
const editmode = ref(false);
const answers = ref([{answer: '', correct: false},{answer: '', correct: false},{answer: '', correct: false},{answer: '', correct: false}]);
const users = ref([]);
const chosen_user = ref(1);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
  }
});

axiosInstance.get('/users').then((response)=>{
  users.value = response.data
})

if(route.params.evaluation_id !== undefined){
  editmode.value = true;
}

if(editmode.value){
  axiosInstance.get('/evaluations/' + route.params.evaluation_id).then((response) => {
    evaluation.value = response.data
  })
}
else{
  evaluation.value.title = ''

  axiosInstance.get('/rubrics/').then((response)=>{
    console.log(response)
    evaluation.value.scores = response.data.map((rubric) => {
      return {
        rubric: {
          id: rubric.id,
          title: rubric.title
        },
        score: 0
      }
    })

    console.log(evaluation)
  })
}

function save(){
  if(editmode.value){
    let data = new FormData();
    data.append('id', evaluation.value.id);
    data.append('title', evaluation.value.title)
    data.append('scores', JSON.stringify(evaluation.value.scores))
    data.append('user_id', chosen_user.value)
    data.append('_method', 'PUT')
    axiosInstance.post('/evaluations/edit', data).then((response) => {console.log(response)})
    router.push({name: 'Admin Evaluatie Overzicht'});
  }
  else{
    let data = new FormData();
    data.append('title', evaluation.value.title)
    data.append('scores', JSON.stringify(evaluation.value.scores))
    data.append('user_id', chosen_user.value)
    axiosInstance.post('/evaluations/add', data).then((response) => {console.log(response)})
    router.push({name: 'Admin Evaluatie Overzicht'});
  }
}

function onUserChange(e){
  console.log(e.target.value)
  chosen_user.value = e.target.value
}

function cancel(){
  confirm('Zeker weten?')
  router.push({name: 'Admin Evaluatie Overzicht'});
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

.answer-list{
  list-style-type: none;
}

.answer-list-item{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
}

.answer-list-item-textwrapper{
  grid-column: span 4 / span 5;
}

.answer-list-item-checkboxwrapper{
  display: flex;
  align-items: center;
  justify-content: center;
}

.answer-list-item-checkbox{
  height: 100%;
  width: auto;


}

.answer-list-item-text{
  width: 100%;
}

</style>
