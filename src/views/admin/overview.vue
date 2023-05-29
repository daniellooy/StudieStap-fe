<template>
    <div class="main">
      <router-link class="admin-block" :to="{name: 'Admin Categorieën Overzicht'}">
        <h2>Categorieën bekijken</h2>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Categorie toevoegen'}">
        <h2>Categorie Toevoegen</h2>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Admin Modules Overzicht'}">
        <h2>Modules bekijken</h2>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Module toevoegen'}">
        <h2>Module Toevoegen</h2>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Admin Videos Overzicht'}">
        <h2>Videos Bekijken</h2>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Video toevoegen'}" >
        <h2>Video Toevoegen</h2>
      </router-link>
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
  width: 100%;
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
