<template>
    <NavAdmin />
    <section class="formwrapper">
      <section class="form">
        <h1>Achievement toevoegen</h1>
        <section class="form-group">
          <label for="name">Achievement naam</label>
          <input type="text" v-model="achievement.name" name="name">
        </section>

        <section class="form-group">
          <label for="description">Achievement beschrijving</label>
          <textarea name="description" v-model="achievement.description" ></textarea>
        </section>


        <h1>Doelen toevoegen</h1>

        <section class="sub-row" v-for="sub in subs">
          <section class="form-group form-group-sub">
            <label for="amount">Doel hoeveelheid</label>
            <input type="number" v-model="sub.amount" name="amount">
          </section>
          <section class="form-group form-group-sub">
            <label for="rang">Rang (start bij 1)</label>
            <input type="number" v-model="sub.rang" name="rang">
          </section>
          <section class="form-group form-group-sub">
            <label for="points">punten</label>
            <input type="number" v-model="sub.points" name="points">
          </section>
        </section>

        <section class="button-section">
          <button class="sub-add__button" @click="addsub()" >Extra doel toevoegen</button>
          <button class="sub-remove__button" @click="removesub()" >Verwijder laatste doel</button>
        </section>

        <section class="button-section">
          <button class="achievement__button" @click="addachievement(achievement, subs)" >Submit achievement</button>
        </section>
      </section>

    </section>
</template>

<script>
import router from '@/router';
import NavAdmin from '../../components/achievement/NavAdmin.vue'
import axios from 'axios';

export default {
  name: "Requests",
  components: {
    NavAdmin
  },
  data() {
    return {
      achievement: {name: "", description: ""},
      subs: [{amount: 0, rang: 1, points: 100}]
    };
  },


  methods:{
    addachievement(achievement, subs){
      axios.post(import.meta.env.VITE_API_ENDPOINT +'/api/achievements', achievement)
      .then((response) => {
        for(let i=0; i<this.subs.length; i++){
          axios.post(import.meta.env.VITE_API_ENDPOINT + '/api/achievements/' + response.data.id + '/subs', subs[i])
          .then((res) => {

          });
        }
      });
      router.push("/admin/achievements");
    },

    addsub(){
      this.subs.push({amount:0, rang: this.subs[this.subs.length - 1].rang + 1, points: 100});
    },

    removesub(){
      if(this.subs.length > 1){
        this.subs.splice(this.subs.length - 1, 1);
      }
    }
  }

};
</script>

<style scoped>

.formwrapper{
  display: flex;
  align-items: center;
  justify-content: center;
}

.form{
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;
  border-radius: 1rem;
  width: 60rem;
  margin: 3rem;
  padding: 2rem;
}

.form-group{
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label{
  font-weight: 500;
}

.form input, textarea{
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #999;
}

.form textarea{
  height: 100px;
}

.button-section{
  display: flex;
  justify-content: center;
  width: 100%;
  gap:1rem;
}

.achievement__button{
  width: 15rem;
  height: 2.5rem;
  background: #339529;
  color: white;
  border-radius: 1.5rem;
  margin-top: 2rem;
}

.sub-add__button{
  width: 15rem;
  height: 2.5rem;
  border-radius: 1.5rem;
  border: 2px solid black;
}

.sub-remove__button{
  width: 15rem;
  height: 2.5rem;
  background: #ff3838d2;
  border-radius: 1.5rem;
  border: 2px solid black;
}

.sub-row{
  display: flex;
  flex-direction: row;
  gap: 1rem;
  /* width: 80%; */
}

.form-group-sub{
  width: 32%;
}
</style>
