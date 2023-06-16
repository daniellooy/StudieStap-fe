<template>

    <NavAdmin />


    <v-expansion-panels class="request__container">
      <v-expansion-panel class="request" v-for="(request, idx) in requests">
        <v-expansion-panel-title class="request__title">
          <section class="bold">{{ request.user.firstname }}</section>
          <p class="text">heeft een aanvraag gedaan voor de achievement</p>
          <section class="bold">{{ request.sub.achievement.name }}</section>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <section class="request__text">
            <section class="request__data">
              <section>{{ request.sub.achievement.description}}</section>
              <section class="request__doel">
                <p class="text">Aangevraagd doel:</p>
                <section class="bold">{{ request.sub.amount }}</section>
              </section>
            </section>
            <section class="request__buttons">
              <button class="request__button request__accept" @click="accept(request.id, idx)">Accept</button>
              <button class="request__button request__deny" @click="deny(request.id, idx)">Deny</button>
            </section>
          </section>
        </v-expansion-panel-text>



      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import NavAdmin from '../../components/achievement/NavAdmin.vue'



export default {
  name: "Requests",
  components: {
    NavAdmin
  },
  data() {
    return {
      requests: []
    };
  },

  mounted() {
    axios.get(import.meta.env.VITE_API_ENDPOINT+'/api/subsdone').then((res) => {
      this.requests = res.data;
      console.log(this.requests);
    });
  },

  methods:{
    toAddAchievement(){
        router.push("admin/addachievement");
    },

    toAddShopItem(){
        router.push("/admin/addshopitem");
    },

    accept(id, idx){
      axios.post(import.meta.env.VITE_API_ENDPOINT+'/api/subs/requests/' + id + '/status', {
        status: "accepted"
      })
        .then((response)=>{
          this.requests.splice(idx,1)
          console.log(response);
        });
    },
    deny(id, idx){
      axios.post(import.meta.env.VITE_API_ENDPOINT+'/api/subs/requests/' + id + '/status', {
        status: "denied"
      })
        .then((response)=>{
          this.requests.splice(idx,1)
          console.log(response);
        });
    },
  }

};
</script>

<style scoped>
.request__container{
  width: 70%;
  margin-top: 2rem;
}

.request{
  /* width: 40rem;
  display: flex;;
  flex-direction: row;
  gap: 1rem;
  border: 0.1rem solid #339529; */
}

.request__title{
  display: flex;
  flex-direction: row;
}

.request__text{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.bold{
  font-weight: bold;
  padding-right: 0.6rem;
}

.text{
  padding-right: 0.6rem;
}

.request__data{
  display: flex;
  flex-direction: column;
}

.request__doel{
  display: flex;
  flex-direction: row;
}

.request__buttons{
  display: flex;
  flex-direction: row;
  gap:1rem;
}

.request__button{
  width: 10rem;
  height: 2.5rem;
  color: white;
  border-radius: 1.5rem;
  border: 1px solid black;
}

.request__accept{
  background: #339529;
}

.request__deny{
  background: #ff3838d2;
}
</style>
