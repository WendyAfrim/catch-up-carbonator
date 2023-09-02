<template>
  <q-form @submit="submitTraining()" v-if="!success">
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="trainingForm.name"
                   label="Nom de la formation"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-input v-model="trainingForm.link" :dense="true" filled standout="bg-green text-white"
                   label="Lien"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-select standout="bg-green text-white" :dense="true" v-model="trainingForm.level"
                    :options="levelOptions" label="Standard"/>
        </div>
      </div>
    </div>
    <div class="text-right">
      <q-btn color="green" label="Créer la formation" class="q-my-md" type="submit"
             :icon="submit ? 'pending' : 'download'"></q-btn>
    </div>
  </q-form>
  <div v-else>
    <Success>
      <p>Votre formation a bien été enregistré !</p>
    </Success>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import {Training, createTraining} from 'src/firebase/Training';
import Success from 'components/SuccessComponent.vue';

const submit = ref(false);
const success = ref(false);

const trainingForm = reactive({
  name: '',
  link: '',
  level: ''
});

const levelOptions = ['Debutant', 'Intermédiaire', 'Avancé'];

function submitTraining() {

  submit.value = !submit.value;

  const training: Training = {
    name: trainingForm.name,
    link: trainingForm.link,
    level: trainingForm.level,
  }

  try {
    createTraining(training).then(() => {
      success.value = true;
    });
  } catch (e) {
    console.log(e);
  }
}
</script>
<style></style>
