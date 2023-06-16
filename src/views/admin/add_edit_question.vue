<template>
  <div class="formwrapper">
    <h1>Vraag {{ editmode ? 'bewerken' : 'toevoegen'}}</h1>

    <div class="form">
      <div class="form-group">
        <label for="title">Vraag</label>
        <input type="text" v-model="question.question" name="title">
      </div>
      <div class="form-group">
        <label for="description">Toelichting</label>
        <textarea v-model="question.explanation" name="description"/>
      </div>
      <div class="form-group">
        <ul class="answer-list">
          <li class="answer-list-item">
            <span class="answer-list-item-textwrapper">
              Vraag
            </span>
            <span class="answer-list-item-checkboxwrapper">
              Correct
            </span>
          </li>
          <li class="answer-list-item" v-for="(answer, index) in answers" :key="answer.id">
            <span class="answer-list-item-textwrapper">
                <input class="answer-list-item-text" type="text" v-model="answers[index].answer">
            </span>
            <span class="answer-list-item-checkboxwrapper">
              <input class="answer-list-item-checkbox" type="checkbox" v-model="answers[index].correct" true-value="1" false-value="0">
            </span>
          </li>
        </ul>
      </div>
      <div class="form-group">
        <label for="module">Video bij deze vraag</label>
        <select @change="onVideoChange($event)" id="">
          <option :selected="editmode && video.id === question.video_id" v-for="video in videos" :key="video.id" :value="video.id">
            {{ video.title }}
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
const question = ref({})
const errors = ref({});
const editmode = ref(false);
const answers = ref([{answer: '', correct: false},{answer: '', correct: false},{answer: '', correct: false},{answer: '', correct: false}]);
const videos = ref([]);
const chosen_video = ref(1);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + '/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
  }
});

axiosInstance.get('/videos').then((response)=>{
  videos.value = response.data
})

if(route.params.question_id !== undefined){
  editmode.value = true;
}

if(editmode.value){
  axiosInstance.get('/question/' + route.params.question_id).then((response) => {
    question.value = response.data
    console.log(response.data.question_answer)
    answers.value = response.data.question_answer
  })
}
else{
  question.value.question = ''
  question.value.description = ''
}

function save(){
  if(editmode.value){
    let data = new FormData();
    data.append('id', question.value.id);
    data.append('question', question.value.question)
    data.append('explanation', question.value.explanation)
    data.append('answers', JSON.stringify(answers.value))
    data.append('video_id', chosen_video.value)
    data.append('_method', 'PUT')
    axiosInstance.post('/question/edit', data).then((response) => {console.log(response)})
    router.push({name: 'Admin Vragen Overzicht'});
  }
  else{
    let data = new FormData();
    data.append('question', question.value.question)
    data.append('explanation', question.value.explanation)
    data.append('answers', JSON.stringify(answers.value))
    data.append('video_id', chosen_video.value)
    axiosInstance.post('/question/add', data).then((response) => {console.log(response)})
    router.push({name: 'Admin Vragen Overzicht'});
  }
}

function onVideoChange(e){
  console.log(e.target.value)
  chosen_video.value = e.target.value
}

function cancel(){
  confirm('Zeker weten?')
  router.push({name: 'Admin Vragen Overzicht'});
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
