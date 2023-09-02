<template>

  <span class="material-icons pointer cta" @click="open">
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
  }
})


</script>
<style lang="scss">
.cta {
  font-size: 1.8em;
  cursor: pointer;
  margin-left: 0.5em;
  color: white;
}
</style>
