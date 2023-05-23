<template>
    <div>
        {{ channelMessages }}
        <input type="text">

        <!-- channel messages -->
        <!-- message inputfield for posting messages -->
    </div>
</template>

<script setup>
const props = defineProps({
    channelMessages: Object
})

</script>

<style scoped></style>