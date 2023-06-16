<template>
  <div class="questionwrapper" :key="route.params.question_id">
    <div class="questionwrapper-contentholder">
      <h3 class="question-text">{{ question.question }}</h3>
      <div class="answerwrapper" v-if="answerclicked" :class="[correct ?  'right' : 'wrong']">
        <p>Jouw Antwoord: {{ answerletters[question.question_answer.findIndex((answer) => answer.id == chosenAnswer)] }}</p>
        <p>{{ correct ? 'Nice!' : 'Jammer :(' }}</p>
        <p>Toelichting:</p>
        <p>{{ question.explanation }}</p>

      </div>
      <ul class="answer-list">
        <li :class="[answerclicked ? answer.correct ? 'rightanswer' : 'wronganswer': '', chosenAnswer == index ? 'chosen':'']" @click="answerClicked(index, answer.id)" class="answer-list-item" v-for="(answer, index) in question.question_answer" v-bind:key="answer.id">
          <span><strong>{{ answerletters[index] }}</strong></span>
          <span>{{ answer.answer }}</span>
        </li>
      </ul>
    </div>
    <video_sidebar :question="true" :video_id="video_id" />
  </div>
</template>

<script setup>
import axios from "axios";
import {onBeforeMount, onBeforeUpdate, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import Video_sidebar from "@/views/Zelfstudie/video_sidebar.vue";
const route = useRoute();
const question = ref({});
const video_id = ref(1);
const answerclicked = ref(false)
const chosenAnswer = ref(null);
const correct = ref(false);


const answerletters = ['A', 'B', 'C', 'D'];
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

async function getContent(id){
  const response = (await axiosInstance.get('/api/question/' + id)).data
  return response
}

onBeforeMount(async () => {
  await getContent(route.params.question_id).then((data) => {
    console.log(data)
    question.value = data
    video_id.value = Number(data.video_id);
    answerclicked.value = data.answered
    if(data.answered){
      chosenAnswer.value = data.userAnswer.answer_id
      if(data.question_answer.find((answer) => answer.id == data.userAnswer.answer_id).correct == 1){
        correct.value = true
      }
    }
  })
})

watch(
  () => route.params.question_id,
  (newId, oldId) => {
    getContent(newId).then((data) => {
      answerclicked.value = false
      chosenAnswer.value = null
      chosenAnswer.value = false
      question.value = data
      video_id.value = Number(data.video_id)
      answerclicked.value = data.answered
      if(data.answered){
        chosenAnswer.value = data.userAnswer.answer_id
        if(data.question_answer.find((answer) => answer.id == data.userAnswer.answer_id).correct == 1){
          correct.value = true
        }
        else{
          correct.value = false
        }
      }

    })
  }
)

function answerClicked(index, answerid){
  if(!answerclicked.value){
    answerclicked.value = true
    chosenAnswer.value = answerid
    if(question.value.question_answer[index].correct == true){
      correct.value = true
    }
    else{
      correct.value = false
    }
    axiosInstance.post("/api/answerquestion", {
      answer_id: answerid,
      question_id: question.value.id
    }).then((response)=>{
      console.log(response)
    })
  }
}

</script>

<style scoped>

.question-text{
  font-size: 14px;
}

.questionwrapper{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.chosen{

}

.answerwrapper{
  font-size: 12px;
  margin-top: 35px;
}

.answer-list{
  list-style-type: none;
}

.right{
  color: #2C9B22;
}

.rightanswer{
  color: #2C9B22;
  box-shadow:   -8px 0 0 0 #2C9B22,
  8px 0 0 0 #2C9B22,
  0 -8px 0 0 #2C9B22,
  0 8px 0 0 #2C9B22 !important;
}

.wronganswer{
  color: #d33643;
  box-shadow:   -8px 0 0 0 #d33643,
  8px 0 0 0 #d33643,
  0 -8px 0 0 #d33643,
  0 8px 0 0 #d33643 !important;
}

.wrong{
  color: #d33643;
}

.answer-list-item{
  margin-top: 35px;
  margin-bottom: 35px;
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 10px;
  font-size: 12px;
  min-height: 100px;
  box-shadow:   -8px 0 0 0 black,
  8px 0 0 0 black,
  0 -8px 0 0 black,
  0 8px 0 0 black;
  cursor: pointer;
}

.answer-list-item-answer{
  font-size: 14px;
  font-weight: 500;
}

.questionwrapper-contentholder{
  grid-column: span 2 / span 3;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  padding: 20px 30px;
  height: min-content;
  font-family: 'Press Start 2P', cursive;
}


.darkbg{
  background-color: #F5F6F4;
}

.question{
  min-height: 100%;
  max-height: 80vh;
  padding: 20px;
}

</style>
