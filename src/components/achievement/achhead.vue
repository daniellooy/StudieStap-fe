<template>
    <section class="achmain">
      <section class="achmain__inside">
        <section class="achmain__title">{{ achievement.name }}</section>
      </section>
    </section>
</template>

<script>
export default {
  props:[
    "achievement"
  ]
}
</script>

<style scoped>
.achmain {
  height: 6rem;
  width: 10rem;
  background: #6b6b6b;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10rem;
}

.achmain__inside {
  height: 5rem;
  width: 9rem;
  border-radius: 1rem;
  background: #339529;
  display: flex;
  align-items: center;
  justify-content: center;
}

.achmain__title {
  font-weight:500;
  color: white;
}
</style>