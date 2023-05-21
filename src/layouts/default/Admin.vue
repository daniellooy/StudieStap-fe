<template>
  <div class="wrapper">
    <div class="topbar">
      <router-link :to="{name: 'Admin overzicht'}">Terug naar overzicht</router-link>
    </div>
    <router-view  />
  </div>
</template>

<script setup>



</script>

<style scoped>
.wrapper{
  background-color: #F4F6F3;
  position: relative;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100vw;
  display: flex;
  align-items: center;
}

.topbar{
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.topbar a{
  color: black;
  text-decoration: none;
}

</style>
