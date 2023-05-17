<template>
  <module_list :title="'Uitgelicht'" :videos="videos"/>
</template>

<script setup>
import Module_list from "@/components/zelfstudie/module_list.vue";


const videos = [
  {
    title: 'Video 1',
    slug: 'video1'
  },
  {
    title: 'Video 2',
    slug: 'video1'
  },
  {
    title: 'Video 3',
    slug: 'video1'
  }
]

</script>

<style scoped>

</style>
