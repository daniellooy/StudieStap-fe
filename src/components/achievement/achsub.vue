<template>
  <!-- sub zit al in dubdone => aangevraagd, gedaan of denied-->
    <section class="achsub" v-if="checkIfDone() == 'accepted'">
      <section class="achsub__inside">
        <section class="achsub__title">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
        </section>
      </section>
    </section>
    <section class="achsub" v-else-if="checkIfDone() == 'denied'">
      <section class="achsub__inside">
        <section class="achsub__title">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
        </section>
      </section>
    </section>
    <section class="achsub" v-else-if="checkIfDone() == 'pending'">
      <section class="achsub__inside">
        <section class="achsub__title">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zM96 64V75c0 25.5 10.1 49.9 28.1 67.9L192 210.7l67.9-67.9c18-18 28.1-42.4 28.1-67.9V64H96zm0 384H288V437c0-25.5-10.1-49.9-28.1-67.9L192 301.3l-67.9 67.9c-18 18-28.1 42.4-28.1 67.9v11z"/></svg>
        </section>
      </section>
    </section>

    <!-- sub zit niet in subdone => locked of ontgrendeld -->
    <section :class="getClass()" v-else>
      <!-- unlocked -->
      <section v-if="isUnlocked()"  @mouseenter="hover = true" @mouseleave="hover = false">
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
      <section class="achsub__locked" v-else>
        <section class="achsub__inside__lock">
          <section class="achsub__title">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
          </section>
        </section>
      </section>




      
      
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

    mounted() {
      console.log(this.sub);
    },

    methods: {
      //checken of sub in subs_done zit
      checkIfDone(){
        if(this.sub.done.length > 0){
          if(this.sub.done[0].status == "pending"){
            return "pending"
          }
          else if(this.sub.done[0].status == "accepted"){
            return "accepted"
          }
          else if(this.sub.done[0].status == "denied"){
            return "denied"
          }
        }
        
        else{
          return false
        }


        // for(let i=0; i < this.sub.done.length; i++){
        //   if(this.sub.done[i].sub_id == this.sub.id){
        //     return "accepted";
        //   }
        // }
        // return false;
      },

      isUnlocked(){
        let highestRang = 0;
        console.log("Test");
        // console.log(this.sub);
        // console.log(this.data);
        console.log(this.data.length);
        for(let i=0; i < this.data.length; i++){
          console.log(this.data[i]);
          if(this.data[i].done.length > 0){
            if(this.data[i].rang > highestRang){
              highestRang = this.data[i].rang
            }
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