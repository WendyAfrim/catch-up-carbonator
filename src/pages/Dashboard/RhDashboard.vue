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
                <Modal title="Ajouter un nouveau consultant" subtitle="Veuillez renseigner toutes ses informations"
                       logo="add_circle">
                  <template #body>
                    <AddConsultantForm></AddConsultantForm>
                  </template>
                </Modal>
              </div>
              <div class="column items-center">
                <h5 class="text-white">Consultants</h5>
                <span class="material-icons icon">
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
                <Modal title="Ajouter un nouveau projet" subtitle="Veuillez renseigner toutes les informations relatives au
                                            projet" logo="add_circle">
                  <template #body>
                    <AddProjectForm></AddProjectForm>
                  </template>
                </Modal>
              </div>
              <div class="column items-center">
                <h5 class="text-white">Projets</h5>
                <span class="icon icon__white material-icons">
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
                <Modal title="Nouvelle formation" subtitle="" logo="add_circle">
                  <template #body>
                    <AddTrainingForm></AddTrainingForm>
                  </template>
                </Modal>
              </div>
              <div class="column items-center">
                <h5 class="text-white">Formations</h5>
                <span class="icon material-icons">
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
                        <q-input outlined v-model="consultantsFilters.position" label="Filtre Poste"
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
    <div class="q-py-md">
      <div class="row justify-around">
        <div class="col-12 col-md-12">
          <h1 class="text-h4 q-pb-md">Nos projets</h1>
          <Card>
            <template #body>
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
                        <q-input outlined v-model="projectsFilters.need"
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
                          Besoins détaillés du projet :
                          <ul v-for="(skill) in props.row.skills" :key="skill.name">
                            <li> {{ skill.name }} | {{ skill.level }} | {{ skill.nb_exp }} ans</li>
                          </ul>

                          <br>
                          Exigences du client
                        </div>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <!-- Formations / Parcours -->
    <div class="q-py-md">
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
                          Besoins détaillés du projet : {{ props.row.skills }}
                          <br>
                          Exigences du client
                        </div>
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
                                <span class="material-icons pointer cta" @click="open">
                                    add_circle
                                </span>
              </router-link>
              <div class="q-pa-md q-gutter-md parcours">
                <q-list bordered padding class="rounded-borders">
                  <q-item-label header>Parcours personnalisés</q-item-label>
                  <q-item clickable v-ripple>
                    <q-item-section avatar top>
                      <q-avatar icon="verified" color="green" text-color="white"/>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">Product Owner</q-item-label>
                      <q-item-label caption>February 22nd, 2019</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-icon name="edit_note" color="green"/>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced/>
                  <q-item clickable v-ripple>
                    <q-item-section avatar top>
                      <q-avatar icon="supervisor_account" color="red" text-color="white"/>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">Scrum Master</q-item-label>
                      <q-item-label caption>March 1st, 2019</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-icon name="edit_note"/>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </template>
          </Card>
        </div>
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
  {name: 'position', align: 'center', label: 'Poste', field: 'position', sortable: true},
  {name: 'skills', label: 'Compétences', field: 'skills'},
  {name: 'state', label: 'Statut', field: 'state'},
]

const consultantsFilters = reactive({
  email: '',
  position: '',
  skills: '',
  level: '',
  state: '',
})

const projectsColumns = [
  {name: 'name', align: 'left', label: 'Nom du projet', field: 'name', sortable: true},
  {name: 'client', align: 'center', label: 'Nom du client', field: 'client', sortable: true},
  {name: 'leadTech', align: 'center', label: 'Tech Lead', field: 'leadTech', sortable: true},
  {name: 'need', align: 'center', label: 'Poste souhaité', field: 'need', sortable: true},
  {name: 'start_at', align: 'center', label: 'Date de début', field: 'start_at', sortable: true},
  {name: 'end_at', align: 'center', label: 'Date de fin', field: 'end_at', sortable: true},
]

const projectsFilters = reactive({
  name: '',
  client: '',
  leadTech: '',
  need: '',
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

const consultants = ref<CreateConsultantOutput[] | undefined>()
const trainings = ref<Training[] | undefined>()
const projects = ref<Project[] | undefined>()
console.log(projects)

onMounted(async () => {
  consultants.value = await getConsultantsOutput();
  trainings.value = await getTrainings();
  projects.value = await getProjects();
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
</style>
