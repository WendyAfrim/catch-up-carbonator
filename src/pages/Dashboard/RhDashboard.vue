<template>
    <div class="q-px-xl">
        <!-- KPI -->
        <div class="row">
            <div class="col-12 col-md-3">
                <div class="q-my-md q-mr-xl">
                    <Card class="my-card bg-green text-grey shadow-4 q-pa-md">
                        <template #body>
                            <div class="text-right">
                                <Modal>
                                    <template #header>
                                        <h1 class="text-h5">Ajouter un nouveau consultant</h1>
                                    </template>
                                    <template #body>
                                        <span>Veuillez renseigner toutes ses informations
                                        </span>
                                        <div class="row">
                                            <div class="col-12 col-md-6">
                                                <div class="q-py-md">
                                                    <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                        label="Nom" />
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="q-py-md q-px-md">
                                                    <q-select standout="bg-green text-white" v-model="model" :dense="true"
                                                        label="Prénom" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-12">
                                                <div class="q-py-md">
                                                    <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                        label="Email" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-6">
                                                <div class="q-py-md">
                                                    <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                        label="Poste" />
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="q-py-md q-px-md">
                                                    <q-select standout="bg-green text-white" v-model="model" :dense="true"
                                                        label="Date d'entrée" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <q-btn color="green" label="Enregistrer" class="q-my-md"></q-btn>
                                        </div>
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
            <div class="col-12 col-md-3">
                <div class="q-my-md q-mr-xl">
                    <Card class="my-card bg-red text-whites shadow-4 q-pa-md">
                        <template #body>
                            <div class="text-right">
                                <span class="material-icons text-white pointer">
                                    add_circle
                                </span>
                            </div>
                            <div class="column items-center">
                                <h5 class="text-white">Offres d'emplois</h5>
                                <span class=" material-icons icon">
                                    handshake
                                </span>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
            <div class="col-12 col-md-3">
                <div class="q-my-md q-mr-xl">
                    <Card class="my-card bg-white text-white shadow-4 q-pa-md">
                        <template #body>
                            <div class="text-right">
                                <span class="material-icons text-grey pointer">
                                    add_circle
                                </span>
                            </div>
                            <div class="column items-center">
                                <h5>Projets</h5>
                                <span class="icon icon__grey material-icons">
                                    workspace_premium
                                </span>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
            <div class="col-12 col-md-3">
                <div class="q-my-md q-mr-xl">
                    <Card class="my-card bg-black text-white shadow-4 q-pa-md">
                        <template #body>
                            <div class="text-right">
                                <span class="material-icons text-white pointer">
                                    add_circle
                                </span>
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
        <OpportunitiesView title="Nos consultants" :columns="columns" :rows="rows" :filter="option">
            <template #body>
                <q-tr>
                    <q-td>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.email" label="Filtre Email" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.position" label="Filtre Poste" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.skills" label="Filtre Compétences" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.state" label="Filtre Statut" dense></q-input>
                    </q-td>
                </q-tr>
            </template>
        </OpportunitiesView>
    </div>
</template>
<script setup lang="ts">
import Card from 'src/components/CardComponent.vue';
import OpportunitiesView from '../OpportunitiesPage.vue';
import Modal from 'src/components/ModalComponent.vue';
import { reactive, ref } from 'vue';


const columns = [
    {
        name: 'firstname',
        required: true,
        label: 'Prénom',
        align: 'center',
        field: 'firstname',
        sortable: true
    },
    { name: 'lastname', align: 'center', label: 'Nom', field: 'lastname', sortable: true },
    { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
    { name: 'position', align: 'center', label: 'Poste', field: 'position', sortable: true },
    { name: 'begin_at', align: 'center', label: 'Date de début', field: 'begin_at', sortable: true },
    { name: 'skills', label: 'Compétences', field: 'skills' },
    { name: 'state', label: 'Statut', field: 'state' },
    { name: 'actions', label: 'Actions', field: 'actions' },
]


const rows = [
    {
        lastname: 'Dupont',
        firstname: "Jean",
        email: "jean@carbon.com",
        position: "Developpeur React",
        begin_at: "06/06/2025",
        skills: "JS, Vue",
        state: 'Libre',
        actions: '1%'
    },
    {
        lastname: 'Ferreira',
        firstname: "Kevin",
        email: "kevin@carbon.com",
        position: "Developpeur Python",
        begin_at: "06/06/2025",
        skills: "Python, Django",
        state: 'Libre',
        actions: '1%'
    },
]

const option = reactive({
    email: '',
    position: '',
    skills: '',
    end_at: '',
    state: '',
})

function filterData(rows, terms, cols, getCellValue) {
    for (const term in terms) {
        rows = rows.filter(row =>
            (row[term] + '').toLowerCase().indexOf(terms[term].toLowerCase()) !== -1
        )
    }
    return rows
} 
</script>
<style>
.pointer {
    cursor: pointer;
}
</style>