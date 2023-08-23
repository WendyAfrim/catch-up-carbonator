<template>
    <q-card :class="props.class">
        <slot name="img"></slot>
        <q-card-section class="q-pt-xs">
            <slot name="body"></slot>
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
const props = defineProps({
    class: {
        type: String
    }
})
</script>

<style lang="scss">
.q-card {
    border-radius: 15px;
}
</style>