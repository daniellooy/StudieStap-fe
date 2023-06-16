<template>
  <li class="video-list-item">
    <router-link :to="
    {
      name: 'Video',
      params: {
        video_id: video.id
      },
    }"
    >
      <div class="video-list-item-thumbnail" :class="[video.completed ? 'completed-border':'']">
        <img :src="import.meta.env.VITE_API_ENDPOINT + video.thumbnail" alt="">
        <span class="video-list-item-thumbnail-check" v-if="video.completed">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="30px" width="30px">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      </div>
      <span class="video-list-item-title">
        {{video.title}}
      </span>
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
  aspect-ratio: 4/3;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
}

.video-list-item-thumbnail-check{
  position: absolute;
  left: 10px;
  bottom: 5px;
  color: #2C9B22;
}

.video-list-item-thumbnail img{
  width: 100%;
  height: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}

.video-list-item-title{
  margin-top: 16px;
  font-weight: 500;
  text-transform: capitalize;
}

.completed-border{
  border: 3px solid #2C9B22;
}
</style>
