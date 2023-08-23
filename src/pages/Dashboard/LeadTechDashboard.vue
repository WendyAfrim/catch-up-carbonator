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
                  <h5 class="text-white">Retours clients</h5>
                  <span class="material-icons icon">
                                        groups
                                    </span>
                </div>
                <div class="text-right">
                  <Modal logo="add_circle">
                    <template #header>
                      <h1 class="text-h5">Visualiser vos retours clients</h1>
                    </template>
                    <template #body>
                      <q-table title="Retours clients" :rows="feedbackClientRows"
                               :columns="feedbackClientColumns" row-key="name"
                               :filter="feedbackClientFilters" :filter-method="filterData">
                        <template v-slot:top>
                          <q-tr>
                            <q-td>
                            </q-td>
                            <q-td>
                              <q-input outlined v-model="feedbackClientFilters.name"
                                       label="Filtre Client" dense></q-input>
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
                                Equipe : {{ props.row.skills }}
                                <br>
                                Retour client :
                              </div>
                            </q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </template>
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
                  <h5 class="text-white">Parcours</h5>
                  <span class="icon material-icons">
                                        grade
                                    </span>
                </div>
                <div class="text-right">
                  <Modal logo="add_circle">
                    <template #header>
                      <h1 class="text-h5">Ajouter une nouvelle formation</h1>
                    </template>
                    <template #body>
                                            <span class="q-px-md">Veuillez renseigner toutes les informations relatives à
                                                la formation
                                            </span>
                      <div class="row">
                        <div class="col-12 col-md-12">
                          <div class="q-py-md q-px-md">
                            <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                     label="Nom de la formation"/>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 col-md-12">
                          <div class="q-py-md q-px-md">
                            <q-input v-model="text" filled standout="bg-green text-white"
                                     label="Lien"/>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 col-md-12">
                          <div class="q-py-md q-px-md">
                            <q-select standout="bg-green text-white" v-model="model"
                                      :options="options" label="Standard"/>
                          </div>
                        </div>
                      </div>
                      <div class="text-right">
                        <q-btn color="green" label="Créer la formation" class="q-my-md"></q-btn>
                      </div>
                    </template>
                  </Modal>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <!-- Mes Equipes -->
    <div class="q-ma-xl">
      <Card>
        <template #body>
          <h1>Mes équipes</h1>
          <div class="q-pa-md">
            <q-option-group v-model="navPos" :options="navigationPositions" color="green" inline
                            class="q-mb-md"/>

            <q-carousel v-model="slide" swipeable animated :navigation-position="navPos" navigation padding
                        height="300px" class="bg-green text-white rounded-borders">
              <q-carousel-slide name="style" class="column no-wrap flex-center items-center">
                <q-icon name="style" size="60px"/>
                <small class="project_title">Projet Carbon</small>
                <div class="q-mt-md text-center">
                  <div class="q-pa-md q-gutter-sm" style="height: 80px">
                    <q-avatar v-for="n in 5" :key="n" size="60px" class="overlapping q-mx-md">
                      <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`">
                    </q-avatar>
                  </div>
                </div>

                <q-btn class="q-mt-xl text-black" color="white">Voir plus</q-btn>
              </q-carousel-slide>
              <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <q-icon name="live_tv" size="56px"/>
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="layers" class="column no-wrap flex-center">
                <q-icon name="layers" size="56px"/>
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="map" class="column no-wrap flex-center">
                <q-icon name="terrain" size="56px"/>
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';

import Card from 'src/components/CardComponent.vue';
import Modal from 'src/components/ModalComponent.vue';
import AddChallengeForm from 'components/Forms/LeadTech/AddChallengeForm.vue';
import AddTrainingForm from 'components/Forms/AddTrainingForm.vue';

const feedbackClientColumns = [
  {
    name: 'client',
    required: true,
    label: 'Client',
    align: 'left',
    field: 'client',
    sortable: true
  },
  {name: 'project', align: 'center', label: 'Nom du projet', field: 'project', sortable: true},
  {name: 'begin_at', align: 'center', label: 'Date de début', field: 'begin_at', sortable: true},
  {name: 'end_at', label: 'Date de fin', field: 'end_at'},
]

const feedbackClientRows = [
  {
    client: 'Total',
    project: 'Hydra',
    begin_at: '13/01/2022',
    end_at: '16/08/2023'
  },
  {
    client: 'Danone',
    project: 'Boom',
    begin_at: '05/01/2021',
    end_at: '01/08/2023'
  },
]

const feedbackClientFilters = reactive({
  name: '',
})

function filterData(rows, terms, cols, getCellValue) {
  for (const term in terms) {
    rows = rows.filter(row =>
      (row[term] + '').toLowerCase().indexOf(terms[term].toLowerCase()) !== -1
    )
  }
  return rows
}

const navPos = ref('bottom');
const navigationPositions = [
  {value: 'top', label: 'top'},
  {value: 'right', label: 'right'},
  {value: 'bottom', label: 'bottom (default)'},
  {value: 'left', label: 'left'}
];

const slide = ref('style');
const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'

</script>
<style lang="scss">
.project_title {
  font-size: 1.5em;
}

.icon {
  font-size: 2.5em;
  color: white;
}

</style>
