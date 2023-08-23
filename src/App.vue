<template>
  <router-view />
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {currentUserStore} from "src/stores/currrent_user"

onMounted(async () => {
  const store = currentUserStore();
  await store.monitorAuthState();
});
</script>
