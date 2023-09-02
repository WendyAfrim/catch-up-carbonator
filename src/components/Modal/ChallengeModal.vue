<template>
  <div class="q-mx-xl q-px-md">
    <div class="column">
      <h3>Dates</h3>
      <p>Date de début : {{ start_at }}</p>
      <p>Date de fin : {{ end_at }}</p>
    </div>
    <q-separator class="q-my-md"/>
    <div class="column">
      <h3>Descriptif</h3>
      <p>
        {{ description }}
      </p>
    </div>
    <q-separator class="q-my-md"/>
    <div class="column">
      <h3>Lots à remporter</h3>
      {{ gifts }}
    </div>

    <div class="text-center q-pt-xl">
      <q-btn color="green">Participer</q-btn>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  'start_at': Date,
  'end_at': Date,
  'description': String,
  'gifts': String
});

</script>
<style></style>
