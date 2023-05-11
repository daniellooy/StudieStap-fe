<template>
  <section class="achievements__container">
    <section class="achievement">
      <section class="achievement__inside">
        <section class="achievement__title">
          LOB-influencer
        </section>
        <section class="achievement__points">
          1000
        </section>
      </section>
    </section>
  </section>
  <!-- <section class="twigs__container"> -->
    <!-- <section
      class="twig__container"
      @click="twigClicked('onderwerp', 0)"
      style="grid-area: onderwerp"
      @mouseenter="
        details = !details;
        detailsInfo = 'onderwerp';
      "
      @mouseleave="details = !details"
    >
      <section
        class="twig__title__full"
        v-if="details && detailsInfo == 'onderwerp'"
      >
        <section class="twig__title">
          <p class="twig__text">Onderwerp</p>
        </section>
      </section>
      <section
        class="twig__inside state0"
        v-if="getState(onderwerp, states[0]) == 0"
      >
        <section class="icon">
          <i class="fa fa-check fa-lg" aria-hidden="true"></i>
        </section>
      </section>
      <section
        class="twig__inside state1"
        v-if="getState(onderwerp, states[0]) == 1"
      >
        <section class="icon">
          <i class="fa fa-exclamation fa-lg" aria-hidden="true"></i>
        </section>
      </section>
      <section
        class="twig__inside state2"
        v-if="getState(onderwerp, states[0]) == 2"
      >
        <section class="icon">
          <i class="fa fa-lock fa-lg" aria-hidden="true"></i>
        </section>
      </section>
    </section> -->
  <!-- </section> -->
</template>

<script>
export default {
  name: "Achievements",
  data(){
        return {
            
        }
    },
    methods: {
        getState(title, state){
            if(state == 2){
                return 2
            }

            let itemAmount = title.length
            let itemsDone = 0
            for(let i=0; i<itemAmount;i++ ){
                if(title[i][1] == 1){
                    itemsDone++
                }
            }

            if(itemAmount == itemsDone){
                return 0
            }

            else{
                return 1
            }
        },

        twigClicked(title, state){
            if(this.states[state] == 2){
                this.states[state] = 1
            }
            else if(this.states[state] == 1){
                this.active = title
                this.overlay_opened = !this.overlay_opened
            }
        }
    }
};
</script>

<style scoped>

.achievements__container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.achievement{
    height:6rem;
    width: 6rem;
    background: #339529;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.achievement__inside{
    height: 85%;
    width: 85%;
    border-radius: 1rem;
    background: #acacac;
    display: flex;
    align-items: center;
    justify-content: center;
}


</style>
