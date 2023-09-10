<template>
  <div class="q-px-xl">
    <!-- KPI -->
    <div class="row justify-between">
      <!-- Consultants -->
      <div class="col-12 col-md-3">
        <div class="q-my-md">
          <Card class="my-card bg-green text-grey shadow-4 q-pa-md">
            <template #body>
              <div class="text-right">
                <Modal logo="add_circle" color="white" title="Ajouter un nouveau membre"
                       subtitle=""
                >
                  <template #body>
                    <div class="row justify-center">
                      <q-btn outline rounded color="green" label="Nouveau Consultant"
                             @click="displayForm('consultant')" class="q-ma-xs"/>
                      <q-btn outline rounded color="red" label="Nouveau LeadTech" @click="displayForm('leadTech')"
                             class="q-ma-xs"/>
                      <q-btn outline rounded color="black" label="Nouveau RH" @click="displayForm('rh')"
                             class="q-ma-xs"/>
                    </div>

                    <div v-if="display === 'consultant'">
                      <AddConsultantForm/>
                    </div>
                    <div v-else-if="display === 'leadTech'">
                      <AddLeadTechForm/>
                    </div>
                    <div v-else-if="display === 'rh'">
                      <AddHRForm/>
                    </div>
                  </template>
                </Modal>
              </div>
              <div class="column items-center">
                <h5 class="text-white">Ressources humaines</h5>
                <span class="material-icons icon card-icon card-icon__white">
                    groups
                </span>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <!-- Projets -->
      <div class="col-12 col-md-3">
        <div class="q-my-md">
          <Card class="my-card bg-red text-white shadow-4 q-pa-md">
            <template #body>
              <div class="text-right">
                <Modal logo="add_circle" color="white" title="Nouveau projet">
                  <template #body>
                    <AddProjectForm></AddProjectForm>
                  </template>
                </Modal>
              </div>
              <div class="column items-center">
                <h5 class="text-white">Projets</h5>
                <span class="icon material-icons card-icon card-icon__white ">
                    workspace_premium
                </span>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <!-- Formations -->
      <div class="col-12 col-md-3">
        <div class="q-my-md">
          <Card class="my-card bg-black text-white shadow-4 q-pa-md column reverse">
            <template #body>
              <div class="text-right">
                <Modal logo="add_circle" color="white" title="Nouvelle formation" subtitle="">
                  <template #body>
                    <AddTrainingForm></AddTrainingForm>
                  </template>
                </Modal>
              </div>
              <div class="column items-center">
                <h5 class="text-white">Formations</h5>
                <span class="icon material-icons card-icon card-icon__white">
                      grade
                </span>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <!-- Consultants / Projects -->
    <div class="q-py-xl">
      <div class="row justify-around">
        <div class="col-12 col-md-12">
          <h1 class="text-h4 q-pb-md">Nos consultants</h1>
          <q-table title="Consultants" :rows="consultants" :columns="consultantsColumns" row-key="name"
                   :filter="consultantsFilters" :filter-method="filterData">

            <template v-slot:top>
              <div class="row">
                <q-tr>
                  <q-td>
                  </q-td>
                  <div class="row">
                    <div class="col-12 col-md-6 q-pa-xs">
                      <q-td>
                        <q-input outlined v-model="consultantsFilters.email" label="Filtre Email"
                                 dense></q-input>
                      </q-td>
                    </div>
                    <div class="col-12 col-md-6  q-pa-xs">
                      <q-td>
                        <q-input outlined v-model="consultantsFilters.hired_as" label="Filtre Poste"
                                 dense></q-input>
                      </q-td>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6 q-pa-xs">
                      <q-td>
                        <q-input outlined v-model="consultantsFilters.skills" label="Filtre Compétences"
                                 dense></q-input>
                      </q-td>
                    </div>
                    <div class="col-12 col-md-6 q-pa-xs">
                      <q-td>
                        <q-input outlined v-model="consultantsFilters.state" label="Filtre Statut"
                                 dense></q-input>
                      </q-td>
                    </div>
                  </div>
                </q-tr>
              </div>
            </template>
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width/>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn size="sm" color="green" round dense @click="props.expand = !props.expand"
                         :icon="props.expand ? 'remove' : 'add'"/>
                </q-td>
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                  <div class="text-left">
                    Description du profil :
                    <br>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
  <div class="q-pa-xl">
    <div class="row justify-around">
      <div class="col-12 col-md-12">
        <h1 class="text-h4 q-pb-md">Nos projets</h1>
        <div class="q-pa-xs">
          <q-table title="Consultants" :rows="projects" :columns="projectsColumns" row-key="name"
                   :filter="projectsFilters" :filter-method="filterData">
            <template v-slot:top>
              <q-tr>
                <q-td>
                </q-td>
                <div class="row">
                  <div class="col-12 col-md-6">
                    <q-td>
                      <q-input outlined v-model="projectsFilters.name" label="Filtre Projet"
                               dense></q-input>
                    </q-td>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-td>
                      <q-input outlined v-model="projectsFilters.client" label="Filtre Client"
                               dense></q-input>
                    </q-td>
                  </div>
                </div>
                <q-td>
                  <q-input outlined v-model="projectsFilters.leadTech"
                           label="Filtre Lead Tech" dense></q-input>
                </q-td>
                <q-td>
                  <q-input outlined v-model="projectsFilters.position"
                           label="Filtre Poste" dense></q-input>
                </q-td>
              </q-tr>

            </template>
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width/>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn size="sm" color="green" round dense
                         @click="props.expand = !props.expand"
                         :icon="props.expand ? 'remove' : 'add'"/>
                </q-td>
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                  <div class="text-left">
                    <span class="text-h6">Langages :</span>
                    <ul>
                      <li v-for="(skill) in props.row.skills" :key="skill.name" class="project_skill">
                        {{ skill.name }} | {{ skill.level }} | {{ skill.nb_exp }} ans
                      </li>
                    </ul>
                    <router-link :to="`/project/${props.row.name}`">
                      <q-btn color="green">Match</q-btn>
                    </router-link>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
  <!-- Formations / Parcours -->
  <div class="q-px-xl">
    <div class="row">
      <div class="col-12 col-md-6 q-pr-xl q-pb-md">
        <h1 class="text-h4 q-pb-md">Nos formations</h1>
        <Card>
          <template #body>
            <div class="q-pa-md">
              <q-table title="Consultants" :rows="trainings" :columns="trainingsColumns" row-key="name"
                       :filter="trainingsFilters" :filter-method="filterData">
                <template v-slot:top>
                  <q-tr>
                    <q-td>
                    </q-td>
                    <q-td>
                      <q-input outlined v-model="trainingsFilters.name" label="Filtre Nom"
                               dense></q-input>
                    </q-td>
                    <q-td>
                      <q-input outlined v-model="trainingsFilters.link" label="Filtre Lien"
                               dense></q-input>
                    </q-td>
                    <q-td>
                      <q-input outlined v-model="trainingsFilters.level"
                               label="Filtre Niveau" dense></q-input>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 col-md-6 parcours">
        <h1 class="text-h4 q-pb-md">Nos parcours</h1>
        <Card>
          <template #body>
            <router-link to="/career">
                <span class="material-icons pointer cta">
                    add_circle
                </span>
            </router-link>
            <div class="q-pa-md q-gutter-md parcours">
              <q-list bordered padding class="rounded-borders">
                <q-item-label header>Parcours personnalisés</q-item-label>
                <q-item clickable v-ripple v-for="(career) in careers" :key="career.position">
                  <q-item-section avatar top>
                    <q-avatar icon="verified" color="green" text-color="white"/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{ career.position }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-icon name="edit_note" color="green"/>
                  </q-item-section>
                  <q-separator spaced/>
                </q-item>
              </q-list>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from 'src/components/CardComponent.vue';
import Modal from 'src/components/ModalComponent.vue';
import {onMounted, reactive, ref} from 'vue';
import AddConsultantForm from 'src/components/Forms/AddConsultantForm.vue';
import AddProjectForm from 'src/components/Forms/AddProjectForm.vue';
import {CreateConsultantOutput, getConsultantsOutput} from 'src/firebase/Consultant';
import AddTrainingForm from 'components/Forms/AddTrainingForm.vue';

import {getTrainings, Training} from 'src/firebase/Training';
import {getProjects, Project} from 'src/firebase/Project';
import {currentUserStore} from 'stores/currrent_user';
import {useRouter} from 'vue-router';
import AddLeadTechForm from 'components/Forms/AddLeadTechForm.vue';
import AddHRForm from 'components/Forms/AddHRForm.vue';
import {Career, getCareers} from 'src/firebase/Careers';

let display = ref('');

function displayForm(resourceType: string) {
  display.value = resourceType;
}

const consultantsColumns = [
  {
    name: 'fullname',
    required: true,
    label: 'Consultant',
    align: 'left',
    field: 'fullname',
    sortable: true
  },
  {name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true},
  {name: 'hired_as', align: 'center', label: 'Poste', field: 'hired_as', sortable: true},
  {name: 'skillsName', label: 'Compétences', field: 'skillsName'},
  {name: 'state', label: 'Statut', field: 'state'},
]

const consultantsFilters = reactive({
  email: '',
  hired_as: '',
  skills: '',
  level: '',
  state: '',
})

const projectsColumns = [
  {name: 'name', align: 'left', label: 'Nom du projet', field: 'name', sortable: true},
  {name: 'client', align: 'center', label: 'Nom du client', field: 'client', sortable: true},
  {name: 'leadTech', align: 'center', label: 'Tech Lead', field: 'leadTech', sortable: true},
  {name: 'position', align: 'center', label: 'Poste souhaité', field: 'position', sortable: true},
  {name: 'start_at', align: 'center', label: 'Date de début', field: 'start_at', sortable: true},
  {name: 'end_at', align: 'center', label: 'Date de fin', field: 'end_at', sortable: true},
]

const projectsFilters = reactive({
  name: '',
  client: '',
  leadTech: '',
  position: '',
  start_at: '',
})

const trainingsColumns = [
  {name: 'name', align: 'left', label: 'Nom de la formation', field: 'name', sortable: true},
  {name: 'link', align: 'center', label: 'Lien', field: 'link', sortable: true},
  {name: 'level', align: 'center', label: 'Niveau', field: 'level', sortable: true},
]

const trainingsFilters = reactive({
  name: '',
  link: '',
  level: '',
})

function filterData(rows: any, terms: any, cols: any, getCellValue: any) {
  for (const term in terms) {
    rows = rows.filter(row =>
      (row[term] + '').toLowerCase().indexOf(terms[term].toLowerCase()) !== -1
    )
  }
  return rows
}

const store = currentUserStore();
const router = useRouter();
const consultants = ref<CreateConsultantOutput[] | undefined>()
const trainings = ref<Training[] | undefined>()
const projects = ref<Project[] | undefined>()
const careers = ref<Career[] | undefined>()

console.log(careers);

onMounted(async () => {
  consultants.value = await getConsultantsOutput();
  trainings.value = await getTrainings();
  projects.value = await getProjects();
  careers.value = await getCareers();
  await store.monitorAuthState();
})
</script>
<style>
.pointer {
  cursor: pointer;
  color: white;
}

.parcours span {
  color: black;
}

.project_skill {
  font-size: 0.9em;
}
</style>
