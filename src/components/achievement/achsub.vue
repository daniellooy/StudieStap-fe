<template>
  <!-- sub zit al in dubdone => aangevraagd, gedaan of denied-->
    <section class="achsub" v-if="checkIfDone() == true">
      <section class="achsub__inside">
        <section class="achsub__title">done</section>
      </section>
    </section>

    <!-- sub zit niet in subdone => locked of ontgrendeld -->
    <section :class="getClass()" v-else>
      <!-- unlocked -->
      <section class="achsub__unlocked" @mouseenter="hover = true" @mouseleave="hover = false">
        <section class="achsub__inside__hover" v-if="hover">
          <section class="achsub__content">
            <section class="achsub__title">{{ sub.amount }}</section>
            <button class="achsub__button" @click="requestAchievement">Request</button>
          </section>
        </section>
        <section class="achsub__inside" v-if="!hover">
          <section class="achsub__inside">
            <section class="achsub__title">{{ sub.amount }}</section>
            <section class="achsub__title">{{ sub.points }}</section>
          </section>
        </section>


        
      </section>

      <!-- locked -->
      <!-- <section class="achsub__locked" v-else>
        <section class="achsub__inside__lock">
          <section class="achsub__title">lock</section>
        </section>
      </section> -->




      
      
    </section>
</template>

<script>
  import axios from 'axios';

  export default {
    props:["data", "sub"],

    data(){
      return {
        hover: false,
      }
    },

    methods: {
      //checken of sub in subs_done zit
      checkIfDone(){
        // console.log(this.sub);
        for(let i=0; i < this.sub.done.length; i++){
          if(this.sub.done[i].sub_id == this.sub.id){
            return true;
          }
        }
        return false;
      },

      checkIfLowestRang(){
        let highestRang = 0;
        // console.log(this.sub);
        // console.log(this.data);
        for(let i=0; i < this.sub.done.length; i++){
          if(this.data[this.sub.done[i].sub_id].rang > highestRang){
            highestRang = this.data[this.sub.done[i].sub_id].rang
          }
        }
        if(this.sub.rang == highestRang+1){
          return true
        }
        else{
          return false
        }
      },

      getClass(){
        if(this.hover == false){
          return "achsub"
        }
        else{
          return "achsub__hover"
        }
      },

      requestAchievement(){
        axios.post('http://localhost:8000/api/subs/' + this.sub.id + '/request');
      }
    }
  }

</script>

<style scoped>
.achsub {
  height: 5rem;
  width: 5rem;
  background: #6b6b6b;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.achsub__hover{
  height: 5rem;
  width: 10rem;
  background: #6b6b6b;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.achsub__unlocked:hover{
  cursor: pointer;
}

.achsub__inside {
  height: 4.4rem;
  width: 4.4rem;
  border-radius: 1rem;
  background: #339529;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.achsub__inside__lock {
  height: 4.4rem;
  width: 4.4rem;
  border-radius: 1rem;
  background: #858585;
  display: flex;
  align-items: center;
  justify-content: center;
}

.achsub__button{
  color: white;
}

.achsub__content{
  display: flex;
  flex-direction: column;
}

.achsub__inside__hover {
  height: 4.4rem;
  width: 9.5rem;
  border-radius: 1rem;
  background: #339529;
  display: flex;
  align-items: center;
  justify-content: center;
}

.achsub__title {
  font-weight:500;
  font-size: large;
  color: white;
}


</style>