<template>
  <div class="q-mx-xl q-px-md" v-if="!success">
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
      <SubmitButton label="Participer" :submit="submit" @click="subscribeToChallenge"></SubmitButton>
    </div>
  </div>
  <div v-else-if="success" class="text-center text-green-9">
    <SuccessComponent>
      Votre inscription a bien été prise en compte ! :)
    </SuccessComponent>
  </div>
  <div v-else-if="errorMessage" class="text-center text-red-9">
    <p>
      Une erreur est survenue
    </p>
  </div>
</template>
<script setup lang="ts">

import SubmitButton from 'components/Buttons/SubmitButton.vue';
import {ref} from 'vue';
import {participate} from 'src/firebase/Challenge';
import {currentUserStore} from 'stores/currrent_user';
import SuccessComponent from 'components/SuccessComponent.vue';

const submit = ref(false);
const success = ref(false);
const errorMessage = ref('');

const store = currentUserStore();

async function subscribeToChallenge() {
  submit.value = true;

  const consultantUid = store.uid;

  if (props.name && consultantUid) {
    await participate(consultantUid, props.name).then(() => {
      success.value = true;
    }).catch((error) => {
      errorMessage.value = error;
    })
  }
}

const props = defineProps({
  'name': String,
  'start_at': Date,
  'end_at': Date,
  'description': String,
  'gifts': String
});

</script>
<style></style>
