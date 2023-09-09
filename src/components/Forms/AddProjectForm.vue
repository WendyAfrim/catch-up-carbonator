<template>
  <q-form @submit="submitProject()" v-if="!success">
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="q-py-md q-px-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="projectForm.name"
                   label="Nom du projet"/>
          <div v-if="errors?.name" class="text-red-9 text-weight-bold">
            <span>{{ errors?.name?._errors[0] }}</span>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-py-md q-px-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="projectForm.client"
                   label="Nom du client"/>
          <div v-if="errors?.client" class="text-red-9 text-weight-bold">
            <span>{{ errors?.client?._errors[0] }}</span>
          </div>
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
          <q-input filled :dense="true" v-model="projectForm.start_at" mask="date" label="Date de début"
                   :rules="['date']">
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
          <div v-if="errors?.start_at" class="text-red-9 text-weight-bold">
            <span>{{ errors?.start_at?._errors[0] }}</span>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-py-md q-px-md">
          <q-input filled :dense="true" v-model="projectForm.end_at" label="Date de fin" mask="date"
                   :rules="['date']">
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
          <div v-if="errors?.end_at" class="text-red-9 text-weight-bold">
            <span>{{ errors?.end_at?._errors[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <q-input :dense="true" standout="bg-green text-white" v-model="projectForm.position" label="Poste souhaité"/>
          <div v-if="errors?.position" class="text-red-9 text-weight-bold">
            <span>{{ errors?.position?._errors[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md q-px-md">
          <div v-for="(skill, counter) in projectForm.skills" :key="counter">
            <div class="row justify-between items-center q-mt-md">
              <div v-if="counter === 0">
                <q-btn size="xs" color="green" round dense @click="addSkillsField(expand)"
                       :icon="expand ? 'remove' : 'add'"/>
              </div>
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
              <div v-if="errors?.skills" class="text-red-9 text-weight-bold">
                <span>{{ errors?.skills?._errors[0] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <SubmitButton label="Créer le projet" :submit="submit"></SubmitButton>
    </div>
  </q-form>
  <div v-else>
    <SuccessComponent>
      <p>Votre projet a été crée avec succès ! </p>
    </SuccessComponent>
  </div>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {Project, createProject} from '../../firebase/Project';
import {Level, PROJECT_STATE} from 'src/firebase/Types';
import SuccessComponent from 'components/SuccessComponent.vue';
import {getLeadTechs, getLeadTechsNames, LeadTech} from 'src/firebase/LeadTech';
import SubmitButton from 'components/Buttons/SubmitButton.vue';
import {z} from 'zod';
import {consultantSchema} from 'src/schema/consultant.schema';
import {projectSchema} from 'src/schema/project.schema';

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
  state: PROJECT_STATE.New
});

const emit = defineEmits(['submitProject']);
const submit = ref(false);
const success = ref(false);

type projectFormSchemaType = z.infer<typeof projectSchema>
const errors = ref<z.ZodFormattedError<projectFormSchemaType> | null>(null);


function submitProject() {

  emit('submitProject');
  submit.value = !submit.value;

  const validSchema = projectSchema.safeParse(projectForm);

  if (!validSchema.success) {
    errors.value = validSchema.error.format();
  } else {
    errors.value = null;

    const project: Project = new Project(
      projectForm.name,
      projectForm.client,
      projectForm.start_at,
      projectForm.end_at,
      projectForm.description,
      projectForm.skills,
      projectForm.position,
      projectForm.state
    );

    createProject(project).then(() => {
      success.value = true;
      console.log('success');

    }).catch((e) => {
      console.log('error: ', e);
    })
  }
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
