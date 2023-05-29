<template>
  <div>
    <h2 class="video-list-title">
      {{ title }}
    </h2>
    <p class="video-list-description">
      {{ description }}
    </p>
    <ul class="video-list">
      <list_item v-for="module in modules" v-bind:key="module.id" :module="module" />
    </ul>
  </div>
</template>

<script setup>
import List_item from "@/components/zelfstudie/module_list_item.vue";

const props = defineProps({
  title: String,
  description: String,
  modules: Array,
})

</script>

<style scoped>

.video-list{
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 24px;
}

.video-list-description{
  margin-bottom: 16px;
}

</style>


