<template>
  <div class="questionwrapper" :key="route.params.question_id">
    <div class="questionwrapper-contentholder">
      <h3 class="question-text">{{ question.question }}</h3>
      <p class="answerwrapper" v-if="answerclicked" :class="[correct ?  'right' : 'wrong']">
        {{ correct ? 'Nice!' : 'Jammer :(' }}
        Toelichting:
        {{ question.explanation }}
      </p>
      <ul class="answer-list">
        <li :class="[answerclicked ? answer.correct ? 'rightanswer' : 'wronganswer': '']" @click="answerClicked(index)" class="answer-list-item" v-for="(answer, index) in question.question_answer" v-bind:key="answer.id">
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
const answer = ref(null);
const answerclicked = ref(false)
const correct = ref(false);


const answerletters = ['A', 'B', 'C', 'D'];
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

async function getContent(id){
  const response = (await axiosInstance.get('/api/question/' + id)).data
  console.log(response)
  return response
}

onBeforeMount(async () => {
  await getContent(route.params.question_id).then((data) => {
    question.value = data
    video_id.value = data.video_id
  })
})

watch(
  () => route.params.question_id,
  (newId, oldId) => {
    getContent(route.params.question_id).then((data) => {
      question.value = data
      video_id.value = data.video_id
    })
  }
)

function answerClicked(index){
  answerclicked.value = true
  if(question.value.question_answer[index].correct == true){
    correct.value = true
  }
  else{
    correct.value = false
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
  0 8px 0 0 #2C9B22;
}

.wronganswer{
  color: #d33643;
  box-shadow:   -8px 0 0 0 #d33643,
  8px 0 0 0 #d33643,
  0 -8px 0 0 #d33643,
  0 8px 0 0 #d33643;
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
