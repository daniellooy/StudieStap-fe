<template>
    <div>
        <ul class="appendix__list">
            <li v-for="appendix in appendixList" :key="appendix.id" :document="appendix">
            </li>
        </ul>
    </div>
</template>
<script scoped name="appendixList">
import { defineProps } from 'vue'

const props = defineProps({
    appendixList: Array
})

console.log(props)
</script>

<style scoped></style>