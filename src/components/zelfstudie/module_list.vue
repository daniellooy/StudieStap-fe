<template>
  <h2 class="video-list-title">
    {{ title }}
  </h2>
  <ul class="video-list">
    <list_item v-for="video in videos" v-bind:key="video" :video="video" />
  </ul>
</template>

<script setup>
import List_item from "@/components/zelfstudie/list_item.vue";

const props = defineProps({
  title: String,
  videos: Array,
})

</script>

<style scoped>

.video-list{
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 24px;
}

.video-list-title{
  margin-bottom: 16px;
}

</style>


