<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Admin"
}
</script>

<style scoped>

.wrapper{
  background-color: #F4F6F3;
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
}

</style>
