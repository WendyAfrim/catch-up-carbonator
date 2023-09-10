<template>
  <q-btn :color="color" :label="label" class="q-my-md" type="submit"
         :icon="submit ? 'pending' : 'send' ">
  </q-btn>
</template>
<script setup lang="ts">
defineProps({
  label: String,
  submit: Boolean,
  color: {
    type: String,
    default: 'green'
  }
})

</script>
<style></style>
