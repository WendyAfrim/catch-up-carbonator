<template>
  <q-form @submit="submitForm()" v-if="!success">
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="challenge.name"
                   label="Nom du challenge"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-input v-model="challenge.description" filled standout="bg-green text-white"
                   type="textarea" label="Description"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="q-py-md q-px-md">
          <q-input filled v-model="challenge.start_at" mask="date" :rules="['date']"
                   label="Date de début" standout="bg-green text-white">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date v-model="challenge.start_at"></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-py-md q-px-md">
          <q-input filled v-model="challenge.delay" mask="date" :rules="['date']"
                   label="Date de fin" standout="bg-green text-white">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date v-model="challenge.delay"></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-input v-model="challenge.gifts" filled standout="bg-green text-white"
                   type="textarea" label="Lot à remporter"/>
        </div>
      </div>
    </div>
    <div class="text-right">
      <q-btn color="green" label="Créer le challenge" class="q-my-md" type="submit"
             :icon="submit ? 'pending' : 'download'"></q-btn>
    </div>
  </q-form>
  <div v-else>
    <Success>
      <p>Votre challenge a bien été enregistré !</p>
    </Success>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import {Challenge, createChallenge} from 'src/firebase/Challenge';
import Success from 'components/SuccessComponent.vue';

const success = ref(false);
const submit = ref(false);

const challenge: Challenge = reactive({
  name: '',
  description: '',
  start_at: new Date('2023/09/01'),
  delay: new Date('2023/09/01'),
  gifts: '',
  isActive: false,
  techLead: ''
})

function submitForm() {

  submit.value = !submit.value;

  createChallenge(challenge).then(() => {
    success.value = true;
  }).catch((e) => {
    console.log(e);
  });
}
</script>
<style></style>
