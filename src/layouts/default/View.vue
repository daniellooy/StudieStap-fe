<template>
  <v-main>
    <div class="wrapper" :class="[day ? 'bg-day':'bg-night']">
      <div class="sidebar">
        <sidebar />
      </div>
      <div class="main">
        <topbar />
        <div class="main-content">
            <router-view />
        </div>
      </div>
    </div>
  </v-main>
</template>

<script setup>
  //
import Topbar from "@/components/navigation/topbar.vue";
  import Sidebar from "@/components/navigation/sidebar.vue";
  import {ref} from "vue";

  const date = new Date();
  const time = date.getHours();
  const day = ref(true);

  if(time >= 18){
    day.value = false
  }
</script>



<style scoped>

.wrapper{
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  position: relative;
}

.bg-day{
  background-image: url('/src/assets/background-day.svg');
  background-size: cover;
  background-position: center;
}

.bg-night{
  background-image: url('/src/assets/background-night.svg');
  background-size: cover;
  background-position: center;
}

.sidebar{
  grid-column: span 2 / span 2;
  background-color: white;
  z-index: 2;
}

.main{
  grid-column: span 8 / span 8;
  position: relative;
}

.main-content{
  max-height: calc(100vh - 90px);
  margin-top: 90px;
  padding: 40px 70px;
  position: relative;
  overflow-y: scroll;
  height: 100%;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.main-content::-webkit-scrollbar {
  display: none;
}

.bg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bg svg{
  width: 100%;
  height: 100%;
}

</style>
