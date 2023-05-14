<template>
  <section class="achievements__container">
    <section class="achievement">
      <achhead :data="achhead"/>
      <section class="achievement__subs" v-for="sub in subs">
        <achsub :data="sub"/>
      </section>
    </section>
  </section>
</template>

<script>
import achhead from "../components/achievement/achhead.vue";
import achsub from "../components/achievement/achsub.vue";

export default {
  name: "Achievements",
  components: {
    achhead,
    achsub,
  },
  data() {
    return {
      achhead: {title: "LOB-influencer", description: "hoeveel workshops heb je gegeven"},
      subs: [{amount: 5, points: 500}, {amount: 10, points: 500}, {amount: 50, points: 1000}, {amount: 100, points: 1500}],
    };
  },
  methods: {
    getState(title, state) {
      if (state == 2) {
        return 2;
      }

      let itemAmount = title.length;
      let itemsDone = 0;
      for (let i = 0; i < itemAmount; i++) {
        if (title[i][1] == 1) {
          itemsDone++;
        }
      }

      if (itemAmount == itemsDone) {
        return 0;
      } else {
        return 1;
      }
    },
  },
};
</script>

<style scoped>
.achievements__container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.achievement{
  display: flex;
  align-items: center;
  column-gap: 4rem;
}

.achievement__subs{
  display: flex;
  align-items: center;
  column-gap: 4rem;
}
</style>
