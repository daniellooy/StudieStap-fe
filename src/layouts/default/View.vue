<template>
  <v-main>
    <div class="wrapper">
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
</script>

<style scoped>

.wrapper{
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
}

.sidebar{
  grid-column: span 2 / span 2;
}

.main{
  grid-column: span 8 / span 8;
  background-color: #F4F6F3;
  position: relative;
}

.main-content{
  max-height: calc(100vh - 90px);
  margin-top: 91px;
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 40px;
  padding-bottom: 40px;
}

</style>
