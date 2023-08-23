<template>
  <span v-if="color === 'white' " class="material-icons pointer cta cta__white" @click="open">
        {{ logo }}
  </span>
  <span v-else-if="color === 'black' " class="material-icons pointer cta cta__black" @click="open">
        {{ logo }}
  </span>
  <q-dialog v-model="icon">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="row items-center q-px-md">
        <slot name="header"></slot>
        <h1 class="text-h5">{{ title }}</h1>
        <q-space/>
        <q-btn icon="close" flat round dense v-close-popup/>
      </q-card-section>

      <q-card-section class="q-px-md">
        <span>{{ subtitle }}</span>
        <slot name="body"></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import {ref} from 'vue';

const icon = ref(false);

const emit = defineEmits(['open']);

function open() {
  emit('open', icon.value = true);
}

const props = defineProps({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  logo: {
    type: String
  },
  color: {
    type: String
  }
})


</script>
<style lang="scss" scoped>
</style>
