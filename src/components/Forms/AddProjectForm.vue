<template>
  <q-form @submit="submitProject()" v-if="!success">
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="q-py-md q-px-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="projectForm.name"
                   label="Nom du projet"/>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-py-md q-px-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="projectForm.client"
                   label="Nom du client"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-input v-model="projectForm.description" filled standout="bg-green text-white" type="textarea"
                   label="Description"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="q-py-md q-px-md">
          <q-input filled v-model="projectForm.start_at" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="projectForm.start_at">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-py-md q-px-md">
          <q-input filled v-model="projectForm.end_at" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="projectForm.end_at">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-date>
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
          <q-input standout="bg-green text-white" v-model="projectForm.position" label="Poste souhaité"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <div class="row q-pb-md">
            <q-btn size="sm" color="green" round dense @click="addSkillsField(expand)"
                   :icon="expand ? 'remove' : 'add'"/>
            <label for="Competences" class="q-pl-xs">Compétences requises</label>
          </div>
          <div v-for="(skill, counter) in projectForm.skills" :key="counter">
            <div class="row justify-between q-mt-md">
              <div v-if="counter !== 0">
                <q-btn size="xs" color="green" round dense @click="deleteSkill(counter)" :icon="'remove'"/>
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
                <q-input standout="bg-green text-white" :dense="true" v-model.lazy="skill.nb_exp"
                         label="Nb expérience"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <q-btn color="green" label="Créer le projet" class="q-my-md" type="submit"
             :icon="submit ? 'pending' : 'download'"></q-btn>
    </div>
  </q-form>
  <div v-else>
    <SuccessComponent>
      <p>Votre projet a été crée avec succès ! </p>
    </SuccessComponent>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import {Project, createProject} from '../../firebase/Project';
import {Level} from 'src/firebase/Types';
import SuccessComponent from 'components/SuccessComponent.vue';

const projectForm = reactive({
  name: '',
  client: '',
  description: '',
  start_at: new Date('2023/08/25'),
  end_at: new Date('2023/08/25'),
  position: '',
  skills: [{
    name: '',
    level: Level.Junior,
    nb_exp: 0
  }],
});

const emit = defineEmits(['submitProject']);
const submit = ref(false);
const success = ref(false);

function submitProject() {

  emit('submitProject');
  submit.value = !submit.value;

  const project: Project = new Project(
    projectForm.name,
    projectForm.client,
    projectForm.start_at,
    projectForm.end_at,
    projectForm.description,
    projectForm.skills,
    projectForm.position,
    '' // TODO verify if oui keep the field leadTech
  );

  createProject(project).then(() => {
    success.value = true;
    console.log('success');

  })
    .catch((e) => {
      console.log('error: ', e);

    })
  console.log('project: ', project)
}

const expand = ref(false);

const levelOptions = ['Junior', 'Confirmé', 'Senior'];

function addSkillsField(expand: boolean) {

  projectForm.skills.push({
    name: '',
    level: Level.Junior,
    nb_exp: 0
  })
}

function deleteSkill(counter: number) {
  projectForm.skills.splice(counter, 1);
}


const date = ref('2023/08/25');

</script>
<style></style>
