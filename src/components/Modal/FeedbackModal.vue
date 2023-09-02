<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="['Did it work?']"
          stamp="1 minutes ago"
          size="10"
          text-color="white"
          bg-color="primary"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">

const props = defineProps({
  'feedback': Object
});

</script>
<style></style>
