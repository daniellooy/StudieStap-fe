<template>
  <section class="subcontainer" @mouseenter="hover = true" @mouseleave="hover = false">
    <!-- locked -->
    <section v-if="status == 'locked'">
      <section class="achsub achsub-groot achsub-locked" v-if="hover">
        <section class="inside inside-groot inside-locked">
          <section class="content">
            <section class="title"> Doel: {{ sub.amount }}</section>
            <section class="points__section">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="white" class="achsub__points__icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <section class="points">{{ sub.points }}</section>
            </section>
          </section>
        </section>
      </section>
      <section class="achsub achsub-klein achsub-locked" v-if="!hover">
        <section class="inside inside-klein inside-locked">
          <svg class="inside__icon" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
        </section>
      </section>
    </section>

    <!-- unlocked -->
    <section v-else-if="status == 'unlocked'">
      <section class="achsub achsub-groot achsub-unlocked">
        <section class="inside inside-groot inside-unlocked">
          <section class="content">
            <section class="title"> Doel: {{ sub.amount }}</section>
            <section class="points__section">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="white" class="achsub__points__icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <section class="points">{{ sub.points }}</section>
            </section>
            <button class="request-button" v-if="hover" @click="requestAchievement">Request</button>
          </section>
        </section>
      </section>
    </section>

    <!-- pending -->
    <section v-else-if="status == 'pending'">
      <section class="achsub achsub-groot achsub-pending" v-if="hover">
        <section class="inside inside-groot inside-pending">
          <section class="content">
            <section class="title"> Doel: {{ sub.amount }}</section>
            <section class="points__section">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="white" class="achsub__points__icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <section class="points">{{ sub.points }}</section>
            </section>
          </section>
        </section>
      </section>
      <section class="achsub achsub-klein achsub-pending" v-if="!hover">
        <section class="inside inside-klein inside-pending">
          <svg class="inside__icon" xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zM96 64V75c0 25.5 10.1 49.9 28.1 67.9L192 210.7l67.9-67.9c18-18 28.1-42.4 28.1-67.9V64H96zm0 384H288V437c0-25.5-10.1-49.9-28.1-67.9L192 301.3l-67.9 67.9c-18 18-28.1 42.4-28.1 67.9v11z"/></svg>
        </section>
      </section>
    </section>

    <!-- denied -->
    <section v-else-if="status == 'denied'">
      <section class="achsub achsub-groot achsub-denied" v-if="hover">
        <section class="inside inside-groot inside-denied">
          <section class="content">
            <section class="title"> Doel: {{ sub.amount }}</section>
            <section class="points__section">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="white" class="achsub__points__icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <section class="points">{{ sub.points }}</section>
            </section>
            <button class="request-button" @click="requestdenied()">Request</button>
          </section>
        </section>
      </section>
      <section class="achsub achsub-klein achsub-denied" v-if="!hover">
        <section class="inside inside-klein inside-denied">
          <svg class="inside__icon" xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
        </section>
      </section>
    </section>

    <!-- accepted -->
    <section v-else-if="status == 'accepted'">
      <section class="achsub achsub-groot achsub-accepted" v-if="hover">
        <section class="inside inside-groot inside-accepted">
          <section class="content">
            <section class="title"> Doel: {{ sub.amount }}</section>
            <section class="points__section">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="white" class="achsub__points__icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <section class="points">{{ sub.points }}</section>
            </section>
          </section>
        </section>
      </section>
      <section class="achsub achsub-klein achsub-accepted" v-if="!hover">
        <section class="inside inside-klein inside-accepted">
          <svg class="inside__icon" xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
        </section>
      </section>
    </section>
  </section>

</template>

<script>
  import axios from 'axios';
  const endpoint = import.meta.env.VITE_API_ENDPOINT
  export default {
    props:["data", "sub"],

    data(){
      return {
        hover: false,
        status: "",
      }
    },


    methods: {
      requestAchievement(){
        axios.post(endpoint + '/api/subs/' + this.sub.id + '/request')
        .then((response)=>{
          this.status = "pending";
        });
      },
      requestdenied(){
        axios.post(endpoint +'/api/subs/requests/' + this.sub.id + '/status', {
          status: "pending"
        })
        .then((response)=>{
          this.status = "pending";
        });
      }
    },

    mounted() {
        if(this.sub.done.length > 0){
            if(this.sub.done[0].status == "pending" || this.request == true){
              this.status = "pending"
            }
            else if(this.sub.done[0].status == "accepted"){
              this.status = "accepted"
            }
            else if(this.sub.done[0].status == "denied"){
              this.status = "denied"
            }
          }
        else{
          let highestRang = 0;
          for(let i=0; i < this.data.length; i++){
            if(this.data[i].done.length > 0){
              if(this.data[i].done[0].status == "accepted"){
                if(this.data[i].rang > highestRang){
                  highestRang = this.data[i].rang
                }
              }
            }
          }
          if(this.sub.rang == highestRang+1){
            this.status = "unlocked"
          }
          else{
            this.status = "locked"
          }
        }
        console.log(this.status);
      },
  }

</script>

<style scoped>
/* achsub */
.achsub{
  background: #6b6b6b;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.achsub-groot{
  height: 7rem;
  width: 10rem;
}

.achsub-klein{
  height: 5rem;
  width: 5rem;
}

.achsub-locked{

}

.achsub-unlocked{
  border: 2px solid black;
  background: #ffffff;
}

.achsub-pending{

}

.achsub-denied{

}

.achsub-accepted{

}


/* achsub inside */
.inside{
  border-radius: 1rem;
  background: #339529;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.inside-groot{
  height: 6.4rem;
  width: 9.4rem;
}

.inside-klein{
  height: 4.4rem;
  width: 4.4rem;
}

.inside-locked{
  background: #6b6b6b;
}

.inside-unlocked{

}

.inside-pending{
  background: #ffeb36cb;
}

.inside-denied{
  background: #ff3838d2;
}

.inside-accepted{

}






.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
}

.title {
  font-weight:500;
  font-size: large;
  color: white;
}

.points{
  color: white;
  font-weight:500;
  font-size: large;
  /* height: 2rem; */
}

.request-button{
  width: 8rem;
  height: 2rem;
  background: white;
  color: black;
  border-radius: 1.5rem;
  border: 2px solid black;
}

.request-button:hover{
  background: rgb(187, 187, 187);
}


/* icons */
.inside__icon{
  fill: white;
}

.points__section{
  display: flex;
  flex-direction: row;
  /* height: 5rem; */
  /* align-items: end; */

}

.achsub__points__icon{
  width: 1.5rem;
  height: 1.5rem;

}

</style>
