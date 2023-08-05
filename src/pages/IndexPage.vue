<template>
  <div class="q-pa-xl">
    <div class="row items-center">
      <div class="col-12 col-md-4">
        <div class="q-pa-md">
          <q-card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 q-mt-sm q-mb-xs text-blue text-bold">Challenge du mois</div>
                <div class="text-caption text-grey">
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

            <q-card-actions>
              <q-btn color="white" text-color="black" label="Voir plus" />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div class="col-12 col-md-7">
        <div class="q-pa-md">
          <q-card class="my-card bg-white shadow-4">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 h5 q-mt-sm q-mb-xs text-blue text-weight-bold my-bold-font">Mes compétences</div>
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

      <div class="col-12 col-md-1">
        <q-card class="my-card bg-white shadow-4">
          <q-card-actions vertical class="justify-around q-px-md">
            <q-btn flat round color="red" icon="favorite" />
            <q-btn flat round color="accent" icon="bookmark" />
            <q-btn flat round color="primary" icon="share" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-4">
        <div class="q-pa-md">
          <q-card class="my-card bg-white shadow-4">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 h5 q-mt-sm  text-blue text-weight-bold my-bold-font">Mes formations</div>
              </q-card-section>
            </q-card-section>

            <div class="row q-pa-md">
              <div class="col col-3">
                <div class="text-h7">Kubernetes</div>
              </div>

              <div class="col col-9">
                <q-linear-progress size="25px" :value="progress1" color="accent">
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="accent" :label="progressLabel1" />
                  </div>
                </q-linear-progress>
              </div>
            </div>

            <div class="row q-pa-md">
              <div class="col col-3">
                <div class="text-h7">Docker</div>
              </div>

              <div class="col col-9">
                <q-linear-progress size="25px" :value="progress2" color="accent">
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="accent" :label="progressLabel2" />
                  </div>
                </q-linear-progress>
              </div>
            </div>
          </q-card>
        </div>
        <div class="q-pa-md">
          <q-card class="my-card bg-white shadow-4">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 h5 q-mt-sm  text-blue text-weight-bold my-bold-font">Boite à idées</div>
              </q-card-section>
            </q-card-section>

            <div class="row q-pa-md">
              <div class="col col-3">
                <div class="text-h7">Kubernetes</div>
              </div>

              <div class="col col-9">
                <q-linear-progress size="25px" :value="progress1" color="accent">
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="accent" :label="progressLabel1" />
                  </div>
                </q-linear-progress>
              </div>
            </div>

            <div class="row q-pa-md">
              <div class="col col-3">
                <div class="text-h7">Docker</div>
              </div>

              <div class="col col-9">
                <q-linear-progress size="25px" :value="progress2" color="accent">
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="accent" :label="progressLabel2" />
                  </div>
                </q-linear-progress>
              </div>
            </div>
          </q-card>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-pa-md">
          <q-card class="my-card bg-white text-grey shadow-4 q-pa-md">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 q-mt-sm q-mb-xs text-blue text-bold">Ma carrière professionnelle</div>
                <div class="q-px-lg q-py-md">
                  <q-timeline color="accent">

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

            <q-card-actions>
              <q-btn color="white" text-color="black" label="Voir plus" />
            </q-card-actions>
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

</script>

<style>
.q-card {
  border-radius: 15px;
}
</style>