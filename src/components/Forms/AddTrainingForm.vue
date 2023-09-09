<template>
  <q-form @submit="submitTraining()" v-if="!success">
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="trainingForm.name"
                   label="Nom de la formation"/>
          <div v-if="errors?.name" class="text-red-9 text-weight-bold">
            <span>{{ errors?.name?._errors[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-input v-model="trainingForm.link" :dense="true" filled standout="bg-green text-white"
                   label="Lien"/>
          <div v-if="errors?.link" class="text-red-9 text-weight-bold">
            <span>{{ errors?.link?._errors[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-select standout="bg-green text-white" :dense="true" v-model="trainingForm.level"
                    :options="levelOptions" label="Standard"/>
          <div v-if="errors?.level" class="text-red-9 text-weight-bold">
            <span>{{ errors?.level?._errors[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <SubmitButton label="Créer le formation" :submit="submit"></SubmitButton>
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
import SubmitButton from 'components/Buttons/SubmitButton.vue';
import {z} from 'zod';
import {consultantSchema} from 'src/schema/consultant.schema';
import {trainingSchema} from 'src/schema/training.schema';

const submit = ref(false);
const success = ref(false);

const trainingForm = reactive({
  name: '',
  link: '',
  level: ''
});

const levelOptions = ['Debutant', 'Intermédiaire', 'Avancé'];

type trainingFormSchemaType = z.infer<typeof trainingSchema>
const errors = ref<z.ZodFormattedError<trainingFormSchemaType> | null>(null);


function submitTraining() {

  submit.value = !submit.value;

  const validSchema = trainingSchema.safeParse(trainingForm);

  if (!validSchema.success) {
    errors.value = validSchema.error.format();
  } else {

    errors.value = null;

    const training: Training = {
      name: trainingForm.name,
      link: trainingForm.link,
      level: trainingForm.level,
    }

    createTraining(training).then(() => {
      success.value = true;
    }).catch((error) => {
      console.log(error);
    })
  }
}
</script>
<style></style>
