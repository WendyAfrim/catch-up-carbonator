<template>
  <q-card :class="props.class" :style="`color: ${props.color};`">
    <slot name="img"></slot>
    <q-card-section :class="props.paddingCardSection">
      <slot name="body"></slot>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const props = defineProps({
  class: {
    type: String
  },
  color: {
    type: String
  },
  paddingCardSection: {
    type: String,
    default: 'q-pt-xs'
  }
})
</script>

<style lang="scss">
.q-card {
  border-radius: 15px;
}
</style>
