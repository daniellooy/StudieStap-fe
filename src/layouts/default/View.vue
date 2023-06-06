<template>
  <v-main>
    <div class="wrapper" :class="[day ? 'bg-day':'bg-night']">
      <div class="overlay" :class="[showSidebar ? 'open':'closed']"></div>
      <div class="sidebar" :class="[showSidebar ? 'open':'closed']" >
        <sidebar @close="closeSidebar()" />
      </div>
      <div class="main">
        <topbar @open="openSidebar()" />
        <div class="main-content">
          <router-view />
        </div>
      </div>
    </div>
  </v-main>
</template>

<script setup>
import Topbar from "@/components/navigation/topbar.vue";
  import Sidebar from "@/components/navigation/sidebar.vue";
  import {ref} from "vue";

  const date = new Date();
  const time = date.getHours();
  const day = ref(true);
  const showSidebar = ref(true);

  if(time >= 18 || time >= 0 && time <= 6){
    day.value = false
  }

  function closeSidebar(){
    showSidebar.value = false
  }

  function openSidebar(){
    showSidebar.value = true
  }
</script>



<style scoped>
.wrapper{
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  position: relative;
}

.overlay{
  display: none;
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

.sidebar {
  grid-column: span 2 / span 2;
  background-color: white;
  z-index: 5;
}

.main {
  grid-column: span 8 / span 8;
  position: relative;
}

.main-content {
  max-height: calc(100vh - 90px);
  margin-top: 90px;
  padding: 40px 70px;
  position: relative;
  overflow-y: scroll;
  height: 100%;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

@media only screen and (max-width: 1280px){
  .main-content{
    padding: 10px 17.5px;
  }

  .main{
    grid-column: span 10 / span 10;
  }

  .sidebar{
    grid-column: span 10 / span 10;
    position: absolute;
    width: 90%;
    z-index: 5;
  }

  .overlay{
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
    position: absolute;
    z-index: 4;
    display: block;
  }

  .closed{
    display: none;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1280px){
  .sidebar{
    grid-column: span 10 / span 10;
    position: absolute;
    width: 60%;
    z-index: 5;
  }
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
