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
                <p>Aucun contribution pour le moment. </p>
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
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs row">
                  <h5>Challenge du mois</h5>
                  <Modal title="Challenge du mois" logo="visibility">
                    <template #body>
                      <ChallengeModal
                        :start_at="challenge.start_at"
                        :end_at="challenge.delay"
                        :description="challenge.description"
                        :gifts="challenge.gifts"
                      />
                    </template>
                  </Modal>
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
              <div class="row justify-between">
                <div class="column">
                  <h5>Mon projet actuel</h5>
                  <div class="text-caption text-grey">
                    <li>Client : Danone</li>
                    <li>Date de début de contrat : 01 Janvier 2023</li>
                    <li>Date de fin de contrat : 18 Novembre 2023</li>
                    <li>CTO du projet : Antoine Lecomte</li>
                  </div>
                </div>
                <div>
                  <Modal title="Retour de votre client" logo="badge">
                    <template #body>
                      <FeedbackModal/>
                    </template>
                  </Modal>
                </div>
              </div>
            </template>
          </Card>
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
                    <h5>Mes compétences</h5>
                    <Modal title="Indiquez vos compétences" logo="add_circle">
                      <template #body>
                        <AddSkillsForm></AddSkillsForm>
                      </template>
                    </Modal>
                  </q-card-section>
                </q-card-section>

                <q-markup-table>
                  <thead>
                  <tr>
                    <th class="text-center text-uppercase">Backend</th>
                    <th class="text-center text-uppercase">Frontend</th>
                    <th class="text-center text-uppercase">Devops</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td class="text-center">Frozen Yogurt</td>
                    <td class="text-center">159</td>
                    <td class="text-center">6</td>
                  </tr>
                  <tr>
                    <td class="text-center">Frozen Yogurt</td>
                    <td class="text-center">159</td>
                    <td class="text-center">6</td>
                  </tr>
                  <tr>
                    <td class="text-center">Frozen Yogurt</td>
                    <td class="text-center">159</td>
                    <td class="text-center">6</td>
                  </tr>
                  <tr>
                    <td class="text-center">Frozen Yogurt</td>
                    <td class="text-center">159</td>
                    <td class="text-center">6</td>
                  </tr>
                  </tbody>
                </q-markup-table>
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

            <div class="row q-pa-md items-center">
              <div class="col col-3">
                <span>Kubernetes</span>
              </div>

              <div class="col col-9 q-px-md text-right">
                <q-chip clickable color="green" text-color="white" icon="check">
                  Terminé
                </q-chip>
              </div>
            </div>

            <div class="row q-pa-md items-center justify-between">
              <div class="col col-3">
                <div class="text-h7">Docker</div>
              </div>

              <div class="col col-9 q-px-md text-right">
                <q-chip clickable color="primary" text-color="white" icon="check">
                  Commencé
                </q-chip>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
  <Modal ref="icon">
    <template #header>
      <h1>Test</h1>
    </template>
    <template #body>
      <h1>Test</h1>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import Card from 'components/CardComponent.vue';
import Modal from 'components/ModalComponent.vue'
import {log} from 'console';
import AddSkillsForm from 'components/Forms/AddSkillsForm.vue';
import {Challenge, getActiveChallenge} from 'src/firebase/Challenge';
import {Training} from 'src/firebase/Training';
import ChallengeModal from 'components/Modal/ChallengeModal.vue';
import FeedbackModal from 'components/Modal/FeedbackModal.vue';

const leftDrawerOpen = ref(true)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const progress1 = ref(0.3);
const progress2 = ref(0.6);

const progressLabel1 = computed(() => {
  return (progress1.value * 100).toFixed(2) + '%'
})

const progressLabel2 = computed(() => {
  return (progress2.value * 100).toFixed(2) + '%'
})


const target1 = ref(false)
const text = ref('');
const icon = ref(false);

const options = ['Junior', 'Intermédiaire', 'Sénior'];
const model = ref();

function loadSkills() {
  console.log('test');
}

const activeChallenge = ref<Challenge[]>()
console.log(activeChallenge);

onMounted(async () => {
  activeChallenge.value = await getActiveChallenge();
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
  color: $green;
}
</style>
