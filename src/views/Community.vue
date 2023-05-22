<template>
  <div class="Community__wrapper">
    <community_channel_Selector />
    <community_channel />
  </div>
</template>

<script setup name="Community">
import community_channel from '@/components/community/community_channel.vue';
import community_channel_Selector from '@/components/community/community_channel_Selector.vue';

</script>

<style scoped>
.Community__wrapper{
  display: grid;
  grid-template-columns: 0.1fr 1.2fr;
  grid-template-areas: ". ."; 
  height: 100%;
  padding: 8px;
  border: #2C9B22 2px solid;
  border-radius: 8px;
}
</style>
