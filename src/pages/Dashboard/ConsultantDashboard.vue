<template>
  <div class="q-px-xl">
    <!-- KPI -->
    <div class="row justify-around">
      <div class="col-12 col-md-4">
        <div class="q-pa-md">
          <Card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <template #body>
              <div class="row justify-between">
                <h5>Opportunités</h5>
                <span class="icon icon__green material-icons">
                    star_rate
                </span>
              </div>
              <div class="text-center q-pt-md">
                <router-link to="/opportunities" class="link link__opportunities text-center">
                  <span class="kpi__content">124</span>
                </router-link>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="q-pa-md">
          <Card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <template #body>
              <div class="row justify-between">
                <h5>Contributions</h5>
                <span class="icon icon__red material-icons">
                  switch_access_shortcut
                </span>
              </div>
              <div class="kpi__content text-center q-pt-md">
                0
              </div>
            </template>
          </Card>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="q-pa-md">
          <Card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <template #body>
              <div class="row justify-between">
                <h5>Bagdes</h5>
                <span class="icon icon__grey material-icons">
                    timeline
                </span>
              </div>
              <div class="q-pt-md">
                <p>Aucun badge pour le moment. </p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- Challenge du mois -->
      <div class="col-12 col-md-6">
        <div class="q-pa-md">
          <Card class="my-card bg-white text-grey shadow-4 q-pa-md" v-for="challenge in activeChallenge"
                :key="challenge.name">
            <template #body>
              <div class="text-right">
                <Modal title="Challenge du mois" logo="visibility" color="green">
                  <template #body>
                    <ChallengeModal
                      :name="challenge.name"
                      :start_at="challenge.start_at"
                      :end_at="challenge.delay"
                      :description="challenge.description"
                      :gifts="challenge.gifts"
                    />
                  </template>
                </Modal>
              </div>
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs row">
                  <h5>Challenge du mois</h5>
                </q-card-section>
              </q-card-section>
              <div class="text-caption">
                <ul>
                  <li>Date de début = {{ challenge.start_at }}</li>
                  <br>
                  <li>Description : {{ challenge.description }}</li>
                </ul>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <!-- Projets -->
      <div class="col-12 col-md-6">
        <div class="q-pa-md">
          <Card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <template #body>
              <div class="text-right">
                <Modal logo="visibility" color="green">
                  <template #header>
                    <h5>{{ project.name }}</h5>
                  </template>
                  <template #body>
                    <p v-if="project.clientFeedback">
                      {{ project.clientFeedback }}
                    </p>
                    <p v-else>
                      Vous n'avez aucun retour client pour le moment.
                    </p>
                  </template>
                </Modal>
              </div>
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <h5>Mon projet actuel</h5>
                  <ul v-if="user.currentProject">
                    <li>Client : {{ user.currentProject.client }}</li>
                    <li>Date de début de contrat : {{ user?.currentProject.start_at }}</li>
                    <li>Date de fin de contrat : {{ user?.currentProject.end_at }}</li>
                    <li>CTO du projet : {{ user?.currentProject.leadTech ?? 'Non défini' }}</li>
                  </ul>
                  <p v-else>Vous n'êtes affecté à aucun projet pour le moment.</p>
                </q-card-section>
              </q-card-section>
            </template>
          </Card>
        </div>
      </div>
      <!--  Parcours    -->
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="col-12 col-md-4">
          <div class="q-pa-md">
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
                                v-for="(career, i) in careers"
                                :key="career.position">
                <div class="q-pt-md text-center">
                  <div>
                    <q-avatar
                      size="90px"
                      class="overlapping"
                    >
                      <img :src="`https://cdn.quasar.dev/img/avatar${i + 1}.jpg`" class="text-center">
                    </q-avatar>
                    <h6 class="q-ma-xs">{{ career.position }}</h6>
                    <Modal :title="career.position" :button=true :button-attr=buttonAttr>
                      <template #body>
                        <h5>Description</h5>
                        <p>{{ career.description }}</p>
                        <q-separator/>
                        <h5>Pré-requis</h5>
                        <p>{{ career.prerequisite }}</p>
                        <q-separator/>
                        <h5>Objectifs à atteindre</h5>
                        <ul>
                          <li v-for="(goal) in career.goals" :key="goal.name">{{ goal.name }}</li>
                        </ul>
                        <div class="text-center">
                          <SubmitButton label="Je soumets une demande" :submit="submit"
                                        @click="applyForCareer(career.position)"/>
                        </div>
                      </template>
                    </Modal>
                  </div>

                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="q-px-xl">
    <div class="row items-baseline">
      <div class="col-12 col-md-6">
        <div class="column">
          <!-- Compétences -->
          <div class="col-12 col-md-6">
            <div class="q-pa-md">
              <q-card class="my-card bg-white shadow-4 q-pa-md">
                <q-card-section horizontal>
                  <q-card-section class="q-pt-xs row">
                    <h5 class="q-pr-xs">Mes compétences</h5>
                    <Modal title="Indiquez vos compétences" logo="add_circle" color="green">
                      <template #body>
                        <AddSkillsForm></AddSkillsForm>
                      </template>
                    </Modal>

                    <Modal color="red" logo="delete" v-if="consultantSkills">
                      <template #header>
                        <h5>Supprimer des compétences</h5>
                      </template>
                      <template #body>
                        <div v-for="(skill) in consultantSkills" :key="skill.name">
                          <q-item clickable v-ripple>
                            <q-item-section avatar top>
                              <q-avatar color="red" icon="delete"
                                        text-color="white" @click="deleteSkill(skill.name)"/>
                            </q-item-section>

                            <q-item-section>
                              <q-item-label lines="1">{{ skill.name }} | {{ skill?.level }} | {{ skill.nb_exp }} ans
                              </q-item-label>
                            </q-item-section>
                            <q-separator spaced/>
                          </q-item>
                        </div>
                      </template>
                    </Modal>
                  </q-card-section>
                </q-card-section>

                <div class="q-pa-md q-gutter-md parcours">
                  <q-list bordered padding class="rounded-borders">
                    <div class="grid" v-if="consultantSkills">
                      <div v-for="(skill,i) in consultantSkills" :key="i" class="box"
                      >
                        <q-item v-ripple>
                          <q-item-section avatar top>
                            <q-avatar color="green" icon="verified"
                                      text-color="white"/>
                          </q-item-section>

                          <q-item-section>
                            <q-item-label lines="1">{{ skill.name }} | {{ skill?.level }} | {{ skill.nb_exp }} ans
                            </q-item-label>
                          </q-item-section>
                          <q-separator spaced/>
                        </q-item>
                      </div>
                    </div>
                    <div v-else class="text-center">
                      <p>Aucune compétences n'a été ajouté à votre profil pour le moment.</p>
                    </div>
                  </q-list>
                </div>

              </q-card>
            </div>
          </div>
        </div>
      </div>
      <!-- Formations -->
      <div class="col-12 col-md-6">
        <div class="q-pa-md">
          <q-card class="my-card bg-white shadow-4 q-pa-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <h5>Mes formations</h5>
                <router-link to="/trainings">
                  <q-btn color="green" label="Parcourir"></q-btn>
                </router-link>
              </q-card-section>
            </q-card-section>

            <div v-if="user.trainings">
              <div class="row q-pa-md items-center" v-for="(training, i) in user.trainings" :key="i" >
                <div class="col col-3">
                  <span>{{ training.name }}</span>
                </div>

                <div class="col col-9 q-px-md text-right">
                  <q-chip clickable color="primary" text-color="white" icon="check" v-if="training.isStarted == 'Started'">
                    Commencé
                  </q-chip>
                  <q-chip clickable color="green" text-color="white" icon="check" v-else>
                    Terminé
                  </q-chip>
                </div>
              </div>
            </div>
            <div v-else>
              <p>Vous ne vous êtes inscrit à aucune formation pour le moment.</p>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import Card from 'components/CardComponent.vue';
import Modal from 'components/ModalComponent.vue'
import AddSkillsForm from 'components/Forms/AddSkillsForm.vue';
import {Challenge, getActiveChallenge} from 'src/firebase/Challenge';
import ChallengeModal from 'components/Modal/ChallengeModal.vue';

import {currentUserStore} from 'stores/currrent_user';
import {Career, getCareers} from 'src/firebase/Careers';
import SubmitButton from 'components/Buttons/SubmitButton.vue';
import {getProject, Project} from 'src/firebase/Project';

const store = currentUserStore();
const user = store.currentUser;

console.log(user);


let icon = ref('verified');
const slide = ref(1);
const submit = ref(false);

const activeChallenge = ref<Challenge[]>();
const project = ref<Project>();
console.log(project);

const consultantSkills = store?.currentUser?.skills;
const careers = ref<Career[] | undefined>();

const buttonAttr = {
  'label': 'En savoir plus',
  'color': 'white',
  'textColor': 'black'
};

function deleteSkill(skill: string) {
  console.log(skill)
//   Todo delete a skill
}

async function applyForCareer(careerName: string) {
  submit.value = true;
  console.log(submit);

//   Todo : Consultant can apply to a career

}

onMounted(async () => {
  await store.monitorAuthState();
  activeChallenge.value = await getActiveChallenge();
  careers.value = await getCareers();
  project.value = await getProject(user.currentProject.name);
})

</script>

<style lang="scss">
.q-card {
  border-radius: 15px;
}

.icon {
  font-size: 2.5em;
  padding: 0.3em;
  color: white;
  border-radius: 10px;
  //margin-left: 3.7em;

  &__green {
    background-color: $green;
  }

  &__red {
    background-color: $red;
  }

  &__grey {
    background-color: $grey;
  }
}

.kpi {
  &__content {
    font-size: 1.8em;
  }
}

.link {
  text-decoration: none;
  color: black;

  &__opportunities {
    font-weight: 500;
    border-radius: 8px;
  }
}

.cta {

  color: $dark;

  &__green {
    color: $green;
  }

  &__red {
    color: $red;
  }

  &__black {
    color: $dark;
  }
}

.grid {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 2;
  grid-gap: 10px; /* OPTIONAL */
}

.full-height-box {
  grid-row: 1 / span 2;
}
</style>
