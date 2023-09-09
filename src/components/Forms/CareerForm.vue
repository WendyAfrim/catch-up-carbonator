<template>
  <div class="col-12 col-md-10 q-pa-md">
    <Card>
      <template #body>
        <q-form @submit="submitCareerDetails()">
          <h2 class="text-h6 text-center">Détails du parcours</h2>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="q-mx-xl q-mt-xl q-py-md">
                <q-input standout="bg-green text-white" :dense="true" v-model="careerForm.position"
                         label="Nom du parcours"/>
                <div v-if="errors?.position" class="text-red-9 text-weight-bold">
                  <span>{{ errors?.position?._errors[0] }}</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="q-mx-xl q-mt-xl">
                <div v-for="(goal, counter) in careerForm.goals" :key="counter">
                  <div class="row items-center">
                    <div v-if="counter !== 0" class="q-pa-xs">
                      <q-btn size="xs" color="green" round dense @click="deleteGoal(counter)" :icon="'remove'"/>
                    </div>
                    <div v-if="counter === 0" class="q-pa-xs">
                      <q-btn size="xs" color="green" round dense @click="addGoalField()"
                             :icon="expand ? 'remove' : 'add'"/>
                    </div>
                    <div class="col-12 col-md-11 q-py-md q-px-md">
                      <q-input standout="bg-green text-white" type="textarea" :dense="true" v-model.lazy="goal.name"
                               label="Objectif" autogrow/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="q-ma-xl">
                <q-input standout="bg-green text-white" type="textarea" :dense="true"
                         v-model="careerForm.description"
                         label="Description"
                         filled/>
                <div v-if="errors?.description" class="text-red-9 text-weight-bold">
                  <span>{{ errors?.description?._errors[0] }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="q-mx-xl q-mb-xl">
                <q-input standout="bg-green text-white" type="textarea" :dense="true"
                         v-model="careerForm.prerequisite"
                         label="Pré-requis" filled
                />
                <div v-if="errors?.prerequisite" class="text-red-9 text-weight-bold">
                  <span>{{ errors?.prerequisite?._errors[0] }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center q-pt-ùd q-pb-md">
            <p v-if="errorMessage" class="text-red-4">{{ errorMessage }}</p>
            <div v-if="success">
              <SuccessComponent>
                <p class="text-green-4">Votre parcours a été crée avec succès</p>
              </SuccessComponent>
            </div>
            <SubmitButton label="Enregistrer" :submit="submit" @click="submit = !submit"></SubmitButton>
          </div>
        </q-form>
      </template>
    </Card>
  </div>
</template>
<script setup lang="ts">
import Card from 'components/CardComponent.vue';
import {reactive, ref} from 'vue';
import {createCareer} from 'src/firebase/Careers';
import SubmitButton from 'components/Buttons/SubmitButton.vue';
import SuccessComponent from 'components/SuccessComponent.vue';
import {z} from 'zod';
import {consultantSchema} from 'src/schema/consultant.schema';
import {careerSchema} from 'src/schema/career.schema';

const submit = ref(false);
const success = ref(false);

const errorMessage = ref('');

const careerForm = reactive({
  position: '',
  location: '',
  description: '',
  prerequisite: '',
  goals: [{
    name: ''
  }]
})

type careerFormSchemaType = z.infer<typeof careerSchema>
const errors = ref<z.ZodFormattedError<careerFormSchemaType> | null>(null);


function submitCareerDetails() {

  const validSchema = careerSchema.safeParse(careerForm);

  if (!validSchema.success) {
    errors.value = validSchema.error.format();
  } else {
    errors.value = null;

    createCareer(careerForm).then(() => {
      success.value = true;
    }).catch((error) => {
      errorMessage.value = error;
    })
  }
}

const expand = ref(false);

function addGoalField() {
  careerForm.goals.push({
    name: ''
  });
}

function deleteGoal(counter: number) {
  careerForm.goals.splice(counter, 1);
}

</script>
<style></style>
