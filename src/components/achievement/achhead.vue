<template>
    <section class="achmain">
      <section class="achmain__inside">
        <section class="achmain__title">{{ achievement.name }}</section>
        <section class="description__container"></section>
        <section class="achmain__description">{{ achievement.description}}</section>
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
  height: 7rem;
  width: 15rem;
  background: #6b6b6b;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10rem;
}

.achmain__inside {
  height: 6.3rem;
  width: 14.3rem;
  border-radius: 1rem;
  background: #339529;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
}

.achmain__title {
  font-weight:600;
  color: white;
  margin: 0.2rem;
  text-decoration: underline;
  text-align: center;
}

.achmain__description{
  /* height: 10rem; */
  text-align: center;
  font-size: small;
  color: white;
}
</style>