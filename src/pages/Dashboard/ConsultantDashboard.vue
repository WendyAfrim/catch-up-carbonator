<template>
    <div class="q-px-xl">
        <!-- KPI -->
        <div class="row">
            <div class="col-12 col-md-4">
                <div class="q-pa-md">
                    <Card class="my-card bg-white text-grey shadow-4 q-pa-md">
                        <template #body>
                            <div class="row">
                                <h5>Opportunités</h5>
                                <span class="icon icon__green material-icons">
                                    star_rate
                                </span>
                            </div>
                            <router-link to="/opportunities">
                                <span class="kpi__content">124</span>
                            </router-link>
                        </template>
                    </Card>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="q-pa-md">
                    <Card class="my-card bg-white text-grey shadow-4 q-pa-md">
                        <template #body>
                            <div class="row">
                                <h5>Contributions</h5>
                                <span class="icon icon__red material-icons">
                                    switch_access_shortcut
                                </span>
                            </div>
                            <div class="kpi__content">
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
                        </template>
                    </Card>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- Challenge du mois -->
            <div class="col-12 col-md-6">
                <div class="q-pa-md">
                    <Card class="my-card bg-white text-grey shadow-4 q-pa-md">
                        <template #body>
                            <h5 class="text-black">Challenge du mois</h5>
                            <div class="text-caption">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et
                                dolore magna aliqua.
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor
                                incididunt ut
                                labore et dolore magna aliqua.
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor
                                incididunt ut
                                labore et dolore magna aliqua.
                                sed do eiusmod tempor incididunt ut labore.
                            </div>
                            <div class="q-pt-md">
                                <router-link to="/challenge">
                                    <q-btn color="green" text-color="white" label="En savoir plus" />
                                </router-link>
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
                                    <q-card-section class="q-pt-xs">
                                        <h5>Mes compétences</h5>
                                        <Modal label="Ajouter">
                                            <template #header>
                                                <h1 class="text-h5">Ajouter vos compétences</h1>
                                            </template>
                                            <template #body>
                                                <span>Indiquez les compétences et les outils que vous maîtrisez ainsi que
                                                    votre niveau
                                                </span>
                                                <div class="row">
                                                    <div class="col col-md-6">
                                                        <div class="q-py-md">
                                                            <q-input standout="bg-green text-white" :dense="true"
                                                                v-model="text" label="Compétences" />
                                                        </div>
                                                    </div>
                                                    <div class="col col-md-6">
                                                        <div class="q-py-md q-px-md">
                                                            <q-select standout="bg-green text-white" v-model="model"
                                                                :options="options" :dense="true"
                                                                label="Niveau d'expérience" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="text-right">
                                                    <q-btn color="green" label="Enregistrer" class="q-my-md"
                                                        @click="loadSkills"></q-btn>
                                                </div>
                                            </template>
                                        </Modal>
                                        <!-- <q-btn color="green" text-color="white" label="Ajouter" @click="icon = true" /> -->
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
        <div class="row">
            <div class="col-12 col-md-12">
                <div class="q-pa-md">
                    <q-card class="my-card bg-white shadow-4">
                        <div class="column">
                            <q-card-section>
                                <q-card-section class="q-pt-xs">
                                    <h5>Mes retours client</h5>
                                </q-card-section>
                                <div class="q-pa-md q-gutter-sm" style="height: 80px">
                                    <q-avatar v-for="n in 5" :key="n" size="40px" class="overlapping"
                                        :style="`left: ${n * 25}px`">
                                        <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`">
                                    </q-avatar>
                                </div>
                            </q-card-section>
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
import { ref, computed } from 'vue';
import Card from 'components/CardComponent.vue';
import Modal from 'components/ModalComponent.vue'
import { log } from 'console';

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