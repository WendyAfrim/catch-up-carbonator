<template>
  <q-form @submit="submitSkills()">
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-px-md q-my-md">
          <div v-for="(skill, counter) in skillsForm" :key="counter">
            <div class="row justify-between items-center q-mt-md">
              <div v-if="counter !== 0">
                <q-btn size="xs" color="green" round dense @click="deleteSkill(counter)" :icon="'remove'"/>
              </div>
              <div v-if="counter === 0">
                <q-btn size="xs" color="green" round dense @click="addSkillsField(expand)"
                       :icon="expand ? 'remove' : 'add'"/>
              </div>
              <div class="col-12 col-md-5">
                <q-input standout="bg-green text-white" :dense="true" v-model.lazy="skill.name"
                         label="Nom"/>
              </div>
              <div class="col-12 col-md-3">
                <q-select standout="bg-green text-white" :dense="true" :options="levelOptions"
                          v-model.lazy="skill.level" label="Niveau"/>
              </div>
              <div class="col-12 col-md-3">
                <q-input standout="bg-green text-white" type="number" :min="0" :dense="true" v-model.lazy="skill.nb_exp"
                         label="Nb expérience"/>
              </div>
            </div>
          </div>
          <div class="text-center q-mt-xl">
            <div v-if="success">
              <SuccessComponent>
                <p class="text-green-4">Vos compétences ont été enregistrées avec succès !</p>
              </SuccessComponent>
            </div>
            <p v-else-if="errorMessage" class="text-red-4">{{ errorMessage }}</p>
            <SubmitButton label="Enregistrer" :submit="submit" @click="submit = !submit"></SubmitButton>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import {HardSkill, Level} from 'src/firebase/Types';
import {addSkills} from 'src/firebase/Consultant';
import SuccessComponent from 'components/SuccessComponent.vue';
import SubmitButton from 'components/Buttons/SubmitButton.vue';
import {currentUserStore} from 'stores/currrent_user';

const expand = ref(false);
const levelOptions = [Level.Junior, Level.Confirmed, Level.Senior];

const submit = ref(false);
const errorMessage = ref('');
const success = ref(false);

const store = currentUserStore();
console.log(store);

const skillsForm = reactive<HardSkill[]>([
    {
      name: '',
      level: Level.Junior,
      nb_exp: 0
    }
  ]
)

function submitSkills() {
  console.log(skillsForm);
  addSkills(skillsForm).then(() => {
    success.value = true;
  }).catch((error) => {
    errorMessage.value = error;
  });
}

function addSkillsField(expand: boolean) {
  skillsForm.push({
    name: '',
    level: Level.Junior,
    nb_exp: 0
  })
}

function deleteSkill(counter: number) {
  // skillsForm.splice(counter, 1);
}

</script>
<style></style>
