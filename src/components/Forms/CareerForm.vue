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
              </div>
            </div>
          </div>
          <div class="text-center q-pt-ùd q-pb-md">
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


const submit = ref(false);
const careerForm = reactive({
  position: '',
  location: '',
  description: '',
  prerequisite: '',
  goals: [{
    name: ''
  }]
})

function submitCareerDetails() {
  createCareer(careerForm)
  console.log(careerForm);
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
