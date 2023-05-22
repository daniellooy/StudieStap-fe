<template>
    <div class="main">
      <router-link class="admin-block" :to="{name: 'Admin Modules'}">
        <h2>Modules bekijken</h2>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Module toevoegen'}">
        <h2>Module Toevoegen</h2>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Video toevoegen'}" >
        <h2>Video Toevoegen</h2>
      </router-link>
      <router-link class="admin-block" to="" />
      <router-link class="admin-block" to="" />
      <router-link class="admin-block" to="" />
    </div>
</template>

<script>
</script>

<style scoped>
.admin-block{
  aspect-ratio: 1/1;
  height: auto;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-items: center;
}

.admin-block h2{
  text-align: center;
}

.wrapper{
  background-color: #F4F6F3;
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
}

.main{
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;
}
</style>
