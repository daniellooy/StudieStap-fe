<template>
    <div>
        <div v-for="message in channelMessages" :key="message.id">{{ message.message && message }}</div>
        <!-- channel messages -->
        <!-- message inputfield for posting messages -->
        <input type="text">
    </div>
</template>

<script setup>
const props = defineProps({
    channelMessages: Object
})

</script>

<style scoped></style>