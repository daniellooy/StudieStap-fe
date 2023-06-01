<template>
    <router-link :to="{name: 'Requests'}">
        <span>Requests</span>
    </router-link>
    <router-link :to="{name: 'add shopitems'}">
        <span>Add shopitem</span>
    </router-link>
    <router-link :to="{name: 'add achievement'}">
        <span>Add achievements</span>
    </router-link>
    
    <section class="request__container">
      <section class="request" v-for="(request, idx) in requests">
        <section>{{ request.user.firstname }}</section>
        <section>{{ request.sub.achievement.name }}</section>
        <section>{{ request.sub.amount }}</section>
        <button @click="accept(request.id, idx)">Accept</button>
        <button @click="deny(request.id, idx)">Deny</button>
      </section>
    </section>
</template>

<script>
import router from '@/router';
import axios from 'axios';



export default {
  name: "Requests",
  components: {

  },
  data() {
    return {
      requests: []
    };
  },

  mounted() {
    axios.get('http://localhost:8000/api/subsdone').then((res) => {
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
      axios.post('http://localhost:8000/api/subs/requests/' + id + '/status', {
        status: "accepted"
      })
        .then((response)=>{
          this.requests.splice(idx,1)
          console.log(response);
        });
    },
    deny(id, idx){
      axios.post('http://localhost:8000/api/subs/requests/' + id + '/status', {
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.request{
  width: 40rem;
  display: flex;;
  flex-direction: row;
  gap: 1rem;
  border: 0.1rem solid #339529;
}
</style>