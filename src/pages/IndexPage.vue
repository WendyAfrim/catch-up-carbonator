<template>
  <div class="q-px-xl">
    <!-- KPI -->
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="q-pa-md">
          <q-card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="row">
                  <h5>Opportunités</h5>
                  <span class="icon icon__green material-icons">
                    star_rate
                  </span>
                </div>
                <span class="kpi__content">124</span>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="q-pa-md">
          <q-card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="row">
                  <h5>Contributions</h5>
                  <span class="icon icon__red material-icons">
                    switch_access_shortcut
                  </span>
                </div>

                <div class="kpi__content">
                  0
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="q-pa-md">
          <q-card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="row">
                  <h5>Progression</h5>
                  <span class="icon icon__grey material-icons">
                    timeline
                  </span>
                </div>
                <div class="q-pt-md">
                  <q-linear-progress size="25px" :value="progress1" color="green">
                    <div class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="green" :label="progressLabel1" />
                    </div>
                  </q-linear-progress>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- Challenge du mois -->
      <div class="col-12 col-md-6">
        <div class="q-pa-md">
          <q-card class="my-card bg-grey-9 text-white shadow-4 q-pa-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <h5 class="text-white">Challenge du mois</h5>
                <div class="text-caption">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                  sed do eiusmod tempor incididunt ut labore.
                </div>
              </q-card-section>
            </q-card-section>

            <div class="q-pa-md q-gutter-sm">
              <q-btn color="green" text-color="white" label="En savoir plus" />
            </div>
          </q-card>
        </div>
      </div>
      <!-- Projets -->
      <div class="col-12 col-md-6">
        <div class="q-pa-md">
          <q-card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <h5>Mon projet actuel</h5>
                <div class="text-caption text-grey">
                  <li>Client : Danone</li>
                  <li>Date de début de contrat : 01 Janvier 2023</li>
                  <li>Date de fin de contrat : 18 Novembre 2023</li>
                  <li>CTO du projet : Antoine Lecomte</li>
                </div>
              </q-card-section>
            </q-card-section>

            <div class="q-pa-md q-gutter-sm">
              <q-btn color="green" text-color="white" label="Details" />
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
  <div class="q-px-xl">
    <div class="row items-baseline">
      <!-- Carriere pro -->
      <div class="col-12 col-md-6">
        <div class="q-pa-md">
          <q-card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <h5>Ma carrière professionnelle</h5>
                <div class="q-px-lg q-py-md">
                  <q-timeline color="red">

                    <q-timeline-entry title="Developpeuse React" subtitle="Janvier 2021">
                      <div>
                        <q-toggle v-model="target1" label="Réaliser formation Angular" />
                      </div>
                    </q-timeline-entry>

                    <q-timeline-entry title="Product Owner" subtitle="Decembre 2024">
                      <div>
                        <q-toggle v-model="target1" label="Réaliser formation Angular" />
                      </div>
                    </q-timeline-entry>
                  </q-timeline>
                </div>
              </q-card-section>
            </q-card-section>

            <div class="q-pa-md q-gutter-sm">
              <q-btn color="green" text-color="white" label="Details" />
            </div>
          </q-card>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="column">
          <!-- Compétences -->
          <div class="col-12 col-md-6">
            <div class="q-pa-md">
              <q-card class="my-card bg-white shadow-4 q-pa-md">
                <q-card-section horizontal>
                  <q-card-section class="q-pt-xs">
                    <h5>Mes compétences</h5>
                    <q-btn color="green" text-color="white" label="Ajouter" />
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
    </div>
    <div class="row">
      <!-- Formations -->
      <div class="col-12 col-md-6">
        <div class="q-pa-md">
          <q-card class="my-card bg-white shadow-4 q-pa-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <h5>Mes formations</h5>
                <!-- <div class="text-h5 h5 q-mt-sm  text-blue text-weight-bold my-bold-font">Mes formations</div> -->
              </q-card-section>
            </q-card-section>

            <div class="row q-pa-md">
              <div class="col col-3">
                <span>Kubernetes</span>
              </div>

              <div class="col col-9">
                <q-linear-progress size="25px" :value="progress1" color="green">
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="green" :label="progressLabel1" />
                  </div>
                </q-linear-progress>
              </div>
            </div>

            <div class="row q-pa-md">
              <div class="col col-3">
                <div class="text-h7">Docker</div>
              </div>

              <div class="col col-9">
                <q-linear-progress size="25px" :value="progress2" color="green">
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="green" :label="progressLabel2" />
                  </div>
                </q-linear-progress>
              </div>
            </div>
          </q-card>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-pa-md">
          <q-card class="my-card bg-white shadow-4">
            <div class="column">
              <q-card-section>
                <q-card-section class="q-pt-xs">
                  <h5>Boite à idées</h5>
                </q-card-section>
                <q-input class="q-py-xs q-px-xs" v-model="text" filled autogrow label="Veuillez écrire ici" color="red" />
                <div class="q-pa-md q-gutter-sm">
                  <q-btn color="green" text-color="white" label="Envoyer" />
                </div>
              </q-card-section>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref, computed } from 'vue';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const querySnapshot = await getDocs(collection(db, 'Users'));
querySnapshot.forEach(async (user) => {
  const {first, last} = user.get('name');
  console.log(`first name: ${first}, last name: ${last}`)
  const isAvailable = user.get('isAvailable')
  console.log(`status: ${isAvailable}`);
  const currentProject = user.get('currentProject')
  console.log(`Current Project name: ${currentProject.name}`);
  const userSkills = await getDocs(collection(db, `Users/${user.id}/skills`));
  userSkills.forEach((skills)=>{
    const hardSkills= skills.get('hardSkills');
    hardSkills.forEach((hardSkill: any) => {
      const {name, level, nb_exp} = hardSkill;
      console.log(`name: ${name}, level: ${level}, nb_exp: ${nb_exp}`);

    })
  })
});



const leftDrawerOpen = ref(false)

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
  margin-left: 3.7em;

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
</style>
