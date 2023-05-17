<template>
  <li class="video-list-item">
    <router-link :to="'/zelfstudie/' + video.slug">
      <div class="video-list-item-thumbnail">

      </div>
      <h3 class="video-list-item-title">
        {{video.title}}
      </h3>
    </router-link>
  </li>
</template>

<script setup>
const props = defineProps({
  video: Object
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
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 12px;
}
</style>
