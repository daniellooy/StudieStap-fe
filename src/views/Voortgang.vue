<template>
  <div class="contentholder">
    <h3>Voortgang</h3>
    <div class="radar-wrapper">
      <p>
        Hey Studiestapper! <br>
        Hiernaast zie je jouw laatste 3 evaluatiescores. <br>
        Onderaan kun je per onderdeel je voortgang vergeleken met vorige evaluaties zien!
      </p>
      <canvas id="radarchart" ></canvas>
    </div>
    <div class="line-wrapper">
        <div>
          <h3 class="rubriclist-title">Klik op een rubric om je voortgang in te zien.</h3>
          <ul class="rubriclist">
            <li class="rubriclist-item" :class="activerubric == rubric.id ? 'active':''" v-for="rubric in rubrics" :key="rubric.id" @click="updateLineChart(rubric.id)">
              {{ rubric.title }}
            </li>
          </ul>
        </div>
        <div id="canvasholder">
          <canvas id="linechart"></canvas>
        </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + '/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})
export default {
  name: "Voortgang",

  data(){
    return {
      rubrics: [],
      evaluations: [],
      activerubric: 1,
      linechart: Chart,
    }
  },

  methods: {
    updateLineChart(activerubric) {
      this.activerubric = activerubric
      document.getElementById('linechart').remove();
      let canvas = document.createElement("canvas");
      canvas.id = "linechart";
      document.getElementById('canvasholder').appendChild(canvas);
      this.linechart = new Chart(
        document.getElementById('linechart').getContext('2d'),
        {
          type: 'line',
          data: {
            labels: this.evaluations.map((evaluation) => evaluation.title),
            datasets: [
              {
                label: this.rubrics.filter((rubric) => rubric.id == this.activerubric)[0].title,
                data: this.evaluations.map((evaluation) => evaluation.scores.filter((score) => score.progressrubric_id == this.activerubric).map((score) => score.score)[0])
              }
            ]
          }
        })
    }
  },

  mounted() {

    axiosInstance.get('/userevaluations').then((response) => {
      console.log(response);
      this.rubrics = [...response.data.rubrics];
      this.evaluations = [... response.data.evaluations];

      console.log(response.data.evaluations);

      const radarchart = new Chart(
        document.getElementById('radarchart').getContext('2d'),
        {
          type: 'radar',
          options: {
            scales: {
              r: {
                angleLines: {
                  display: false
                },
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          },
          data: {
            labels: this.rubrics.map((rubric) => rubric.title),
            datasets: this.evaluations.map((evaluation) => {
                return {
                  label: evaluation.title,
                  data: evaluation.scores.map((score) => score.score)
                }
            })
          }
        });

      this.linechart = new Chart(
        document.getElementById('linechart').getContext('2d'),
        {
          type: 'line',
          data: {
            labels: this.evaluations.map((evaluation) => evaluation.title),
            datasets: [
              {
                label: this.rubrics.filter((rubric) => rubric.id == this.activerubric)[0].title,
                data: this.evaluations.map((evaluation) => evaluation.scores.filter((score) => score.progressrubric_id == this.activerubric).map((score) => score.score)[0])
              }
            ]
          }
        })

    });
  }
}
</script>

<style scoped>
.contentholder{
  background-color: white;
  padding: 20px 30px;
  border-radius: 20px;
}

.radar-wrapper{
  max-height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#canvasholder{
  min-height: 350px;
}

.active{
  font-weight: 600;
}

.rubriclist-item{
  cursor: pointer;
  margin-bottom: 8px;
}

.line-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.rubriclist{
  list-style-type: none;
}

.rubriclist-title{
  margin-bottom: 10px;
}

@media only screen and (max-width: 768px){
  .radar-wrapper{
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 50px;
  }

  .line-wrapper{
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px){
  .radar-wrapper{
    margin-bottom: 80px;
  }
}
</style>
