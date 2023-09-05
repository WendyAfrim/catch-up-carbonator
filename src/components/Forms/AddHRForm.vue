<template>
  <q-form @submit="submitHr()" v-if="!success">
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="q-py-md q-pr-md">
          <q-input standout="bg-green text-white" v-model="hrForm.firstName" :dense="true"
                   label="Prénom"/>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-py-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="hrForm.lastName" label="Nom"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="hrForm.email" label="Email"/>
        </div>
      </div>
    </div>
    <div class="text-right">
      <q-btn color="green" label="Enregistrer" class="q-my-md" type="submit"
             :icon="submit ? 'pending' : 'download' ">
      </q-btn>
    </div>
  </q-form>
  <div v-else>
    <Success></Success>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import {HR, createHRAccount} from 'src/firebase/HR';
import Success from 'components/SuccessComponent.vue';

const hrForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
});
const date = ref('2019/02/01');
const emit = defineEmits(['submit']);
const submit = ref(false);
const success = ref(false);
function submitHr() {
  emit('submit');
  submit.value = !submit.value;
  const hr: HR = {
    firstName: hrForm.firstName,
    lastName: hrForm.lastName,
    email: hrForm.email,

  };
  console.log(hr);
  createHRAccount(
    {
      email: hrForm.email,
      password: 'Test123'//window.crypto.getRandomValues(new BigUint64Array(1))[0].toString(36)
    },
    hr
  ).then((response) => {
    success.value = true;
    console.log(response);
  });
}

</script>
<style></style>
