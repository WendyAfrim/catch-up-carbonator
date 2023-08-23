<template>
  <q-btn color="green" :label="label" class="q-my-md" type="submit"
         :icon="submit ? 'pending' : 'download' ">
  </q-btn>
</template>
<script setup lang="ts">
import {ref} from 'vue';

defineProps({
  label: String,
  submit: Boolean
})

</script>
<style></style>
