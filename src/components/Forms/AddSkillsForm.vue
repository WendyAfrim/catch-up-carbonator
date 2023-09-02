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
            <q-btn color="green" type="submit">Enregistrer</q-btn>
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

const expand = ref(false);
const levelOptions = ['Junior', 'Confirmé', 'Senior'];

const skillsForm = reactive<HardSkill[]>([
    {
      name: '',
      level: Level.Junior,
      nb_exp: 0
    }
  ]
)

function submitSkills() {
  addSkills(skillsForm);
}

function addSkillsField(expand: boolean) {
  skillsForm.push({
    name: '',
    level: Level.Junior,
    nb_exp: 0
  })
}

function deleteSkill(counter: number) {
  skillsForm.splice(counter, 1);
}

</script>
<style></style>
