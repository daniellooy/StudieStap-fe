<template>
  <li class="video-list-item">
    <router-link :to="
    {
      name: 'Module overzicht',
      params: {
        module_id: module.id
      },
    }"
     >
      <div class="video-list-item-thumbnail">
        <img :src="'http://localhost:8000' + module.thumbnail" alt="">
      </div>
      <span class="video-list-item-title">
        {{module.title}}
      </span>
    </router-link>
  </li>
</template>

<script setup>
const props = defineProps({
  module: Object
})
</script>

<style scoped>
.video-list-item{
  display: flex;
  flex-direction: column;
}

.video-list-item a{
  text-decoration: none;
  color: black;
}

.video-list-item-thumbnail{
  overflow: hidden;
  margin-bottom: 10px;
  min-width: 250px;
}

.video-list-item-thumbnail img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}


.video-list-item-title{
  margin-top: 16px;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
