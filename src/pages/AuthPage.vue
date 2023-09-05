<template>
  <LoginForm></LoginForm>
</template>
<script setup lang='ts'>
import LoginForm from 'components/Forms/LoginForm.vue';
import {onMounted} from 'vue';
import {currentUserStore} from 'src/stores/currrent_user'

const store = currentUserStore();
onMounted(async () => {
  await store.monitorAuthState();
})

</script>


<style scoped>

</style>
