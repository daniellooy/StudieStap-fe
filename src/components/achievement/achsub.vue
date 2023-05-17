<template>
    <section class="achsub">
      <section class="achsub__inside">
        <section class="achsub__title">{{ data.amount }}</section>
      </section>
    </section>
</template>

<script>
  export default {
    props:["data"]

  }
</script>

<style scoped>
.achsub {
  height: 5rem;
  width: 5rem;
  background: #6b6b6b;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin: 1rem; */
}

.achsub__inside {
  height: 4.4rem;
  width: 4.4rem;
  border-radius: 1rem;
  background: #339529;
  display: flex;
  align-items: center;
  justify-content: center;
}

.achsub__title {
  font-weight:500;
  font-size: large;
  color: white;
}
</style>