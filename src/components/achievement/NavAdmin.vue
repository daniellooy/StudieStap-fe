<template>
    <section class="nav">
        <router-link  style="text-decoration: none; color: inherit;" :to="{name: 'Requests'}">
            <span class="nav__route">Requests</span>
        </router-link>
        <router-link style="text-decoration: none; color: inherit;" :to="{name: 'add shopitems'}">
            <span class="nav__route">Add shopitem</span>
        </router-link>
        <router-link style="text-decoration: none; color: inherit;" :to="{name: 'add achievement'}">
            <span class="nav__route">Add achievements</span>
        </router-link>
    </section>
</template>

<style scoped>
.nav{
  display: flex;
  flex-direction: row;
  gap: 5rem;
}
</style>