<template>
  <div class="q-px-xl">
    <div class="row justify-around">
      <!-- Retours clients -->
      <div class="col-12 col-md-3">
        <div class="q-my-md">
          <Card class="my-card bg-green text-grey shadow-4 q-pa-md">
            <template #body>
              <div class="column reverse">
                <div class="column items-center text-center">
                  <h5 class="text-white">A venir</h5>
                  <span class="material-icons icon">
                                        groups
                                    </span>
                </div>
                <div class="text-right">
                  <Modal logo="add_circle" color="white">
                  </Modal>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <!-- Challenges -->
      <div class="col-12 col-md-3">
        <div class="q-my-md">
          <Card class="my-card bg-red text-white shadow-4 q-pa-md column reverse">
            <template #body>
              <div class="text-right">
                <Modal title="Nouveau challenge" logo="add_circle">
                  <template #body>
                    <AddChallengeForm/>
                  </template>
                </Modal>
              </div>
              <div class="column items-center">
                <h5 class="text-white">Challenges</h5>
                <span class="icon material-icons">
                      grade
                </span>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <!-- Demandes de parcours -->
      <div class="col-12 col-md-3">
        <div class="q-my-md">
          <Card class="my-card bg-black text-white shadow-4 q-pa-md">
            <template #body>
              <div class="column reverse">
                <div class="column items-center">
                  <h5 class="text-white">A venir</h5>
                  <span class="icon material-icons">
                    grade
                  </span>
                </div>
                <div class="text-right">
                  <Modal logo="add_circle">
                  </Modal>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <div class="row justify-around">
      <!-- Projets -->
      <div class="col-12 col-md-4">
        <!--        <div class="q-pa-md col-12 col-md-6">-->
        <h1>Nouveaux Projets</h1>
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="black"
          navigation
          padding
          arrows
          height="350px"
          class="bg-white text-black shadow-1 rounded-borders"
        >
          <q-carousel-slide :name="i + 1" class="column no-wrap flex-center q-pa-md"
                            v-for="(project, i) in projects"
                            :key="project.name">
            <div class="q-pt-md text-center">
              <div>
                <q-icon name="style" size="56px" color="black"/>
                <h6 class="q-ma-xs">{{ project.name }}</h6>
                <Modal :title="project.name" :button=true :button-attr=buttonAttr>
                  <template #body>
                    <div v-if="!success">
                      <div class="row">
                        <div class="col-12 col-md-6">
                          <div class="column">
                            <h5>Client</h5>
                            <p>{{ project.client }}</p>
                            <!--                            <q-separator spaced/>-->
                            <h5>Dates</h5>
                            <div class="column">
                              <div class="col-12 col-md-6">
                                <span>Date de début :</span>
                                {{ project.start_at }}
                              </div>
                              <div class="col-12 col-md-6">
                                <span>Date de fin :</span>
                                {{ project.end_at }}
                              </div>
                            </div>

                          </div>
                        </div>
                        <q-separator spaced vertical="vertical"/>
                        <div class="col-12 col-md-4">
                          <div class="column">
                            <h5>Description</h5>
                            <p>{{ project.description }}</p>
                            <h5>Stack</h5>
                            <ul>
                              <li v-for="(skill) in project.skills" :key="skill.name">{{ skill.name }}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="text-center q-mt-xl">
                        <div v-if="errorMessage">
                          <p class="text-red-9 text-center">{{ errorMessage }}</p>
                        </div>
                        <SubmitButton label="Je participe au projet" :submit="submit"
                                      @click="subscribeProject(project.name)"
                        />
                      </div>
                    </div>
                    <div class="text-green-4 text-center" v-else-if="success">
                      <SuccessComponent>
                        <p>Vous avez bien été ajouté au projet ! :)</p>
                      </SuccessComponent>
                    </div>
                  </template>
                </Modal>
              </div>

            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-12 col-md-7">
        <h1>Mes Equipes</h1>
        <q-table title="Equipes" :rows="teamsRows" :columns="teamsColumns" row-key="name"
                 :filter-method="filterData">
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
                <ModalComponent logo="visibility" color="green">
                  <template #header>
                    <h5>{{ props.row.project }}</h5>
                  </template>
                  <template #body>
                    <div v-if="!success">
                      <div class="row">
                        <div class="col-12 col-md-6">
                          <div class="column">
                            <h5>Client</h5>
                            <ul>
                              <li>Ville de Paris</li>
                            </ul>
                            <h5>Equipes</h5>
                            <ul>
                              <li v-for="(consultant, i) in user.project.team" :key="i">{{ consultant.position }} -
                                {{ consultant.firstname }} - {{ consultant.email }}
                              </li>
                            </ul>
                            <h5>Description</h5>
                            <p>PXO est une société spécialisée dans le domaine du Web. Nous nous intéressons en
                              particulier au domaine du numérique et des médias pour enrichir l’expérience
                              utilisateur. </p>
                          </div>
                        </div>
                        <q-separator spaced vertical="vertical"/>
                        <div class="col-12 col-md-5">
                          <div class="text-center">
                            <h5>Consultant</h5>
                            <q-avatar size="5em">
                              <img src="https://cdn.quasar.dev/img/avatar.png">
                            </q-avatar>
                            <ul>
                              <li>Nom : Anne Laure</li>
                              <li>Poste : Developpeuse JS Fullstack</li>
                            </ul>
                            <div v-if="!leadtechProject.clientFeedback">
                              <h5>Retour client :</h5>
                              <q-input
                                v-model="feedback"
                                filled
                                autogrow
                                type="textarea"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row justify-center">
                        <SubmitButton label="Enregistrer" color="green" class="q-mx-xs q-mt-xl"
                                      :submit="submit"
                                      @click="postFeedback(user.project.name ,feedback)"></SubmitButton>
                      </div>
                    </div>
                    <div v-else class="text-green-4 text-center">
                      <SuccessComponent>
                        <p>Votre retour client a bien été enregistré !</p>
                      </SuccessComponent>
                    </div>
                  </template>
                </ModalComponent>
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <div class="row">
      <!-- Demandes de parcours -->
      <div class="col-12 col-md-12">
        <div class="q-pa-md col-12 col-md-6">
          <h1>Demandes de parcours</h1>
          <q-table title="Parcours" :rows="rows" :columns="columns" row-key="name"
                   :filter-method="filterData">
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width/>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <!--              {{ props }}-->
              <q-tr :props="props">
                <q-td auto-width>
                  <ModalComponent logo="visibility" color="green">
                    <template #header>
                      <h5>{{ props.row.career }}</h5>
                    </template>
                    <template #body>
                      <div class="row">
                        <div class="col-12 col-md-6">
                          <div class="column">
                            <h5>Consultant</h5>
                            <ul>
                              <li>Nom : Jordy</li>
                              <li>Poste actuel : Developpeur JS/React</li>
                            </ul>
                            <h5>Skills</h5>
                            <ul>
                              <li>Javascript | Junior | 2 ans</li>
                              <li>React | Junior | 2 ans</li>
                              <li>Vue | Confirmé | 4 ans</li>
                            </ul>
                          </div>
                        </div>
                        <q-separator spaced vertical="vertical"/>
                        <div class="col-12 col-md-4">
                          <h5>Objectifs</h5>
                          <div>
                            <q-toggle
                              v-model="value"
                              color="primary"
                              keep-color
                              label="Objectif 1"
                            />
                          </div>
                          <div>
                            <q-toggle
                              v-model="value"
                              color="primary"
                              keep-color
                              label="Objectif 2"
                            />
                          </div>
                          <div>
                            <q-toggle
                              v-model="value"
                              color="primary"
                              keep-color
                              label="Objectif 3"
                            />
                          </div>
                          <div>
                            <q-toggle
                              v-model="value"
                              color="primary"
                              keep-color
                              label="Objectif 4"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row justify-center">
                        <SubmitButton label="Accepter" color="green" class="q-mx-xs q-my-md"
                                      :submit="submit" @click="acceptCareer('Product Owner', 'Jordy')"></SubmitButton>
                        <SubmitButton label="Refuser" color="red" class="q-mx-xs q-my-md"
                                      :submit="submit" @click="refuseCareer('Product Owner', 'Jordy')"></SubmitButton>
                      </div>
                    </template>
                  </ModalComponent>
                </q-td>
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
  <!--  </div>-->
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';

import Card from 'src/components/CardComponent.vue';
import Modal from 'src/components/ModalComponent.vue';
import AddChallengeForm from 'components/Forms/LeadTech/AddChallengeForm.vue';
import AddTrainingForm from 'components/Forms/AddTrainingForm.vue';
import SubmitButton from 'components/Buttons/SubmitButton.vue';
import {addFeedBack, CreateProjectOutput, getProject, getProjectsOutput, Project} from 'src/firebase/Project';
import {currentUserStore} from 'stores/currrent_user';
import ModalComponent from 'components/ModalComponent.vue';
import {PROJECT_STATUS} from 'src/firebase/Types';
import {setLeadTechProject} from 'src/firebase/LeadTech';
import SuccessComponent from 'components/SuccessComponent.vue';

const submit = ref(false);
const success = ref(false);
const errorMessage = ref('');

const slide = ref(1);
const store = currentUserStore();
const user = store.currentUser;
// const leadTechProjectName = user?.project?.name;

const columns = [
  {name: 'consultant', align: 'center', label: 'Consultant', field: 'consultant', sortable: true},
  {name: 'career', align: 'center', label: 'Parcours', field: 'career', sortable: true},

]

const rows = [
  {
    consultant: 'Jordy',
    career: 'Product Owner',
  },
]

const teamsColumns = [
  {name: 'project', align: 'left', label: 'Projet', field: 'project', sortable: true},
  {name: 'client', align: 'center', label: 'Client', field: 'client', sortable: true},

]

// const teamsRows = [
//   {
//     project: user?.project.name,
//     client: user?.project.client,
//   },
// ]


const buttonAttr = {
  'label': 'En savoir plus',
  'color': 'white',
  'textColor': 'black'
};

function filterData(rows, terms, cols, getCellValue) {
  for (const term in terms) {
    rows = rows.filter(row =>
      (row[term] + '').toLowerCase().indexOf(terms[term].toLowerCase()) !== -1
    )
  }
  return rows
}

const projects = ref<CreateProjectOutput[] | undefined>();
const leadtechProject = ref<Project | undefined>();

const feedback = ref('');

async function subscribeProject(projectName: string) {
  submit.value = true;
  const leadtechUid = store.uid;

  if (leadtechUid) {
    setLeadTechProject(leadtechUid, projectName).then(() => {
      success.value = true;
    }).catch((error) => {
      errorMessage.value = error;
    })
  }
}

async function acceptCareer(career: string, consultant: string) {
  submit.value = true;

}

async function refuseCareer(career: string, consultant: string) {
  submit.value = true;

}

async function postFeedback(project: string, feedback: string) {
  submit.value = true;
  addFeedBack(project, feedback).then(() => {
    success.value = true;
  }).catch((error) => {
    errorMessage.value = error;
  })
}


onMounted(async () => {
  projects.value = await getProjectsOutput(PROJECT_STATUS.In_Progress);
  // if (leadTechProjectName) {
  //   leadtechProject.value = await getProject(leadTechProjectName);
  // }
})

</script>
<style lang="scss" scoped>
.project_title {
  font-size: 1.5em;
}

.icon {
  font-size: 2.5em;
  color: white;
}

ul {
  margin-left: 0;
  padding-left: 0.8em;
}

li {
  padding-left: 0;
}
</style>
