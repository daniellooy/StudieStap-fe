<template>
    <div class="document__item">
        <img :src="document.image" alt="Docuemtn Image">
        <p>{{ document.name }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    document: Array
})
</script>

<style scoped>
.document__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 8px;
    background: #C8D7EC;
}
</style>
