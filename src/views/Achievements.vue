<template>
  <section class="achievements__container">
    <section class="achievement" v-for="achievement in achievements">
      <achhead :achievement="achievement"/>
      <section class="achievement__subs" v-for="sub in achievement.subs">
        <!-- <svg class="line" width="500" height="500"><line x1="100" y1="100" x2="10" y2="100" stroke="black"/></svg> -->
        <achsub :sub="sub" :data="achievement.subs"/>
      </section>
    </section>
  </section>
</template>

<script>
import achhead from "../components/achievement/achhead.vue";
import achsub from "../components/achievement/achsub.vue";
import axios from 'axios';

export default {
  name: "Achievements",
  components: {
    achhead,
    achsub,
  },
  data() {
    return {
      achievements: [],
    };
  },

  mounted() {
    axios.get('http://localhost:8000/api/achievements').then((res) => {
      this.achievements = res.data;
      // console.log(this.achievements);
    });
  },

  methods: {
    getsubs(achhead){
      let sublist = [];
      for(const sub of this.achsubs) {
        if(sub.achievement_id == achhead.id){
          sublist.push(sub);
        }
      }
      // console.log(sublist);
      return sublist;
    }
  },
};
</script>

<style scoped>
.achievements__container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 2rem;
}

.achievement{
  display: flex;
  align-items: center;
  column-gap: 4rem;
}

.achievement__subs{
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 4rem;
}

.line{
    position:absolute;
}
</style>
