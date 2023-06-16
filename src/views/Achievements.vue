<template>
  <section class="achievement__top">
      <button class="achievement__nav__button" @click="toShop()">To shop</button>
      <section class="points__section">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="sidebar-list-item-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        <section class="points">{{ user.points }}</section>
      </section>
    </section>
  <section class="achievements__container">
    <section class="achievement" v-for="achievement in achievements">
      <achhead :achievement="achievement"/>
      <section class="achievement__subs" v-for="sub in achievement.subs">
        <svg class="line" width="50" height="100"><line x1="500" y1="50" x2="0" y2="50" stroke="black"/></svg>
        <achsub :sub="sub" :data="achievement.subs"/>
      </section>
    </section>
  </section>
</template>

<script>
import achhead from "../components/achievement/achhead.vue";
import achsub from "../components/achievement/achsubNew.vue";
import axios from 'axios';
import router from "@/router";
import {useAppStore} from "@/store/store";
import {storeToRefs} from "pinia";

const store = useAppStore();
const {user} = storeToRefs(store);

export default {
  name: "Achievements",
  components: {
    achhead,
    achsub,
  },
  data() {
    return {
      achievements: [],
      user: user
    };
  },

  mounted() {
    axios.get('https://185-220-205-7.cloud-xip.com/api/achievements').then((res) => {
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
    },

    toShop(){
      router.push("/shop");
    }
  },
};
</script>

<style scoped>
.achievement__top{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.points__section{
  display: flex;
  flex-direction: row;

}

.sidebar-list-item-icon{
    width: 32px;
    height: 32px;
    margin-right: 4px;
}
.points{
  font-size: x-large;
  font-weight: 600;
}

.achievement__nav__button{
  font-size: large;
  text-decoration: underline;
}
.achievements__container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 2rem;
  margin-top: 2rem;
}

.achievement{
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

.achievement__subs{
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
}

.line{
    /* position:absolute; */
}


</style>
