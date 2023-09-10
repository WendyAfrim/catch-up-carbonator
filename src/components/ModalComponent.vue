<template>
  <div v-if="button">
    <q-btn :label="buttonAttr.label" :color="buttonAttr.color" :text-color="buttonAttr.textColor"
           :size="buttonAttr.size" @click="open"/>
  </div>
  <span v-if="color === 'white' && !button " class="material-icons pointer cta cta__white" @click="open">
          {{ logo }}
    </span>
  <span v-else-if="color === 'black'  && !button" class="material-icons pointer cta cta__black" @click="open">
          {{ logo }}
    </span>
  <span v-else-if="color === 'green' && !button " class="material-icons pointer cta cta__green" @click="open">
          {{ logo }}
    </span>
  <span v-else-if="color === 'red' && !button " class="material-icons pointer cta cta__red" @click="open">
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
  button: {
    type: Boolean,
    default: false
  },
  buttonAttr: {
    type: Object
  },
  size: {
    type: String,
    default: 'md'
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  logo: {
    type: String,
    default: 'add_circle'
  },
  color: {
    type: String,
    default: 'green'
  }
})
</script>
<style lang="scss" scoped>
</style>
