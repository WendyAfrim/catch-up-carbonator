<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-mx-xl">
        <div class="row justify-around">
          <!-- Retours clients -->
          <div class="col-12 col-md-3">
            <div class="q-my-md">
              <Card class="my-card bg-green text-black shadow-4 q-pa-md">
                <template #body>
                  <div class="column reverse">
                    <div class="column items-center text-center">
                      <h5 class="text-white">Retours clients</h5>
                      <span class="material-icons icon icon__white">
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
                          <h1 class="text-h5">Vos demandes de parcours</h1>
                        </template>
                        <template #body>
                          <q-table title="Retours clients" :rows="careersRows"
                                   :columns="careersColumns" row-key="name"
                                   :filter="careersFilters" :filter-method="filterData">
                            <template v-slot:top>
                              <q-tr>
                                <q-td>
                                </q-td>
                                <q-td>
                                  <div class="row">
                                    <q-input outlined v-model="careersFilters .consultant"
                                             label="Filtre Consultant" dense class="q-pa-xs"></q-input>
                                    <q-input outlined v-model="careersFilters.career"
                                             label="Filtre Parcours" dense class="q-pa-xs"></q-input>
                                  </div>
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
                                    <div class="row">
                                      <q-btn size="sm" class="q-ma-sm" color="green">Accepter</q-btn>
                                      <q-btn size="sm" class="q-ma-sm" color="red">Refuser</q-btn>
                                    </div>
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
        </div>
        <!-- Mes Equipes -->
        <div class="row justify-between">
          <div class="col-12 col-md-8">
            <div class="text-center">
              <h3>Mes équipes</h3>
            </div>
            <q-carousel
              v-model="slide"
              transition-prev="jump-right"
              transition-next="jump-left"
              swipeable
              animated
              control-color="white"
              prev-icon="arrow_left"
              next-icon="arrow_right"
              navigation-icon="radio_button_unchecked"
              navigation
              padding
              arrows
              height="300px"
              class="bg-grey-8 text-white shadow-1 rounded-borders"
            >
              <q-carousel-slide name="style" class="column no-wrap flex-center items-center">
                <q-icon name="style" size="56px"/>
                <div class="q-mt-md text-center">
                  {{ lorem }}
                </div>
                <div class="q-pa-md q-gutter-sm" style="height: 80px">
                  <q-avatar
                    v-for="n in 5"
                    :key="n"
                    size="50px"
                    class="overlapping"
                    :style="`left: ${n * 25}px`"
                  >
                    <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`">
                  </q-avatar>
                </div>
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
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
  <!--  </div>-->
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

const careersColumns = [
  {
    name: 'consultant',
    required: true,
    label: 'Consultant',
    align: 'left',
    field: 'consultant',
    sortable: true
  },
  {name: 'career', align: 'center', label: 'Parcours souhaité', field: 'career', sortable: true},
]

const careersRows = [
  {
    consultant: 'Ghislaine Garnier',
    career: 'Product Owner',
  },
  {
    consultant: 'Sylvain Brochard',
    career: 'Lead Tech',
  },
]

const careersFilters = reactive({
  consultant: '',
  career: ''
})

function filterData(rows, terms, cols, getCellValue) {
  for (const term in terms) {
    rows = rows.filter(row =>
      (row[term] + '').toLowerCase().indexOf(terms[term].toLowerCase()) !== -1
    )
  }
  return rows
}

const slide = ref('style');
const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'

</script>
<style lang="scss">
.project_title {
  font-size: 1.5em;
}

.icon {
  font-size: 2.5em;

  &__white {
    color: white;
  }
}

</style>
