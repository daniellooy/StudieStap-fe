<template>
    <div class="main">
      <router-link class="admin-block" :to="{name: 'Admin Categorieën Overzicht'}">
        <h3>Categorieën bekijken</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Categorie toevoegen'}">
        <h3>Categorie Toevoegen</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Admin Modules Overzicht'}">
        <h3>Modules bekijken</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Module toevoegen'}">
        <h3>Module Toevoegen</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Admin Videos Overzicht'}">
        <h3>Videos Bekijken</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Video toevoegen'}" >
        <h3>Video Toevoegen</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Admin Vragen Overzicht'}">
        <h3>Vragen Bekijken</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Vraag toevoegen'}" >
        <h3>Vraag Toevoegen</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Admin Rubrics Overzicht'}" >
        <h3>Evaluatie Rubrics Bekijken</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Rubric toevoegen'}" >
        <h3>Evaluatie Rubric Toevoegen</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Admin Evaluatie Overzicht'}" >
        <h3>Evaluaties Bekijken</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Evaluatie toevoegen'}" >
        <h3>Evaluatie Toevoegen</h3>
      </router-link>
      <router-link class="admin-block" :to="{name: 'Channel Overzicht'}" >
        <h2>Channel Overzicht</h2>
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

.admin-block h3{
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
