<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-item fullsize">
      <div class="dashboard-item-title">
        <p>Wist je dat?</p>
      </div>
      <div class="dashboard-item-content">
        <p>{{ funfact.fact }}</p>
      </div>
    </div>
    <div class="dashboard-item">
      <div class="dashboard-item-title">
        <p>Uitgelichte module</p>
      </div>
<!--      <div class="dashboard-item-content featuredmodule">-->
<!--        <p>De uitgelichte module van deze week is: <strong>{{ moduletitle }}</strong></p>-->
<!--        <p>Deze module gaat over:</p>-->
<!--        <p>{{ moduledesc }}</p>-->
<!--        <p><strong>Bekijk hem <router-link :to="{name: 'Module overzicht', params: { module_id: moduleid } }">hier!</router-link></strong></p>-->
<!--      </div>-->
    </div>
    <div class="dashboard-item medium">
      <div class="dashboard-item-title">
        <p>What's happening?</p>
      </div>
      <div class="dashboard-item-content">
<!--        <ul v-if="users.length > 0" class="event-list">-->
<!--          <li  class="event-list-item" v-bind:key="user.id" v-for="user in users.sort((a, b) => new Date(a.date_of_birth) < new Date(b.date_of_birth) ? 1 : -1)">-->
<!--            <span class="event-list-item-left">-->
<!--              <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">-->
<!--                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />-->
<!--              </svg>-->
<!--              {{ user.date_of_birth.split("-")[1] }}-{{ user.date_of_birth.split("-")[2] }}-->
<!--            </span>-->
<!--            <span class="event-list-item-right">-->
<!--              {{ user.firstname }} {{ user.lastname }} is jarig!-->
<!--            </span>-->
<!--          </li>-->
<!--        </ul>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {onBeforeMount, ref} from "vue";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})

const users = ref([]);
const funfact = ref({});
const featuredmodule = ref({});
const moduletitle = ref('');
const moduleid = ref(0);
const moduledesc = ref('');

async function getDashboardContent()
{
  return (await axiosInstance.get('/api/dashboard')).data
}


onBeforeMount(async () => {
  await getDashboardContent().then((response)=> {
    console.log(response)
    users.value = [...response.users]
    funfact.value = response.funfact
    featuredmodule.value = response.featuredmodule;
    moduletitle.value = response.featuredmodule.moduledata.title
    moduleid.value = response.featuredmodule.module_id
    moduledesc.value = response.featuredmodule.moduledata.description
  })
})




</script>


<style scoped>

.dashboard-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 45px;
}

.dashboard-item{
  border-radius: 20px;
  background-color: white;
  grid-column: span 1.5 / span 3;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.dashboard-item-title{
  padding: 20px;
  font-weight: 500;
  border-bottom: 1px solid #E0DDCF;
}

.dashboard-item-content{
  padding: 20px;
}

.medium{
  grid-column: span 2 / span 3;
}

.fullsize{
  grid-column: span 3 / span 3;
}

.event-list{
  list-style-type: none;
}

.event-list-item{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  margin-bottom: 10px;
}

.event-list-item-left{
  grid-column: span 1 / span 6;
  display: flex;
  align-items: center;
  gap: 10px;
}

.featuredmodule{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-list-item-right{
  grid-column: span 5 / span 6;
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 768px){
  .dashboard-wrapper{
    grid-template-columns: 1fr;
  }

  .medium{
    grid-column: span 1 / span 1;
  }

  .fullsize{
    grid-column: span 1 / span 1;
  }

  .event-list-item-left{
    grid-column: span 2 / span 6;
  }

  .event-list-item-right{
    grid-column: span 4 / span 6;
  }
}

</style>
