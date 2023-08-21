<template>
    <div class="q-px-xl">
        <!-- KPI -->
        <div class="row justify-around">
            <!-- Consultants -->
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
            <!-- Projets -->
            <div class="col-12 col-md-3">
                <div class="q-my-md q-mr-xl">
                    <Card class="my-card bg-red text-white shadow-4 q-pa-md">
                        <template #body>
                            <div class="text-right">
                                <Modal>
                                    <template #header>
                                        <h1 class="text-h5">Ajouter un nouveau projet</h1>
                                    </template>
                                    <template #body>
                                        <span class="q-px-md">Veuillez renseigner toutes les informations relatives au
                                            projet
                                        </span>
                                        <div class="row">
                                            <div class="col-12 col-md-6">
                                                <div class="q-py-md q-px-md">
                                                    <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                        label="Nom du projet" />
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="q-py-md q-px-md">
                                                    <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                        label="Nom du client" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-12">
                                                <div class="q-py-md q-px-md">
                                                    <q-input v-model="text" filled standout="bg-green text-white"
                                                        type="textarea" label="Description" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-6">
                                                <div class="q-py-md q-px-md">
                                                    <q-input filled v-model="date" mask="date" :rules="['date']"
                                                        label="Date de début" standout="bg-green text-white">
                                                        <template v-slot:append>
                                                            <q-icon name="event" class="cursor-pointer">
                                                                <q-popup-proxy>
                                                                    <q-date v-model="date"></q-date>
                                                                </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                    </q-input>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <div class="q-py-md q-px-md">
                                                    <q-input filled v-model="date" mask="date" :rules="['date']"
                                                        label="Date de fin" standout="bg-green text-white">
                                                        <template v-slot:append>
                                                            <q-icon name="event" class="cursor-pointer">
                                                                <q-popup-proxy>
                                                                    <q-date v-model="date"></q-date>
                                                                </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-12">
                                                <div class="q-py-md q-px-md">
                                                    <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                        label="Intitulé du poste" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-12">
                                                <div class="q-py-md q-px-md">
                                                    <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                        label="Compétences" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <q-btn color="green" label="Créer le projet" class="q-my-md"></q-btn>
                                        </div>
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
        <!-- Consultants -->
        <div class="q-py-xl">
            <h1 class="text-h4 q-pb-md">Nos consultants</h1>
            <q-table title="Consultants" :rows="consultantsRows" :columns="consultantsColumns" row-key="name"
                :filter="consultantsFilters" :filter-method="filterData">
                <template v-slot:top>
                    <q-tr>
                        <q-td>
                        </q-td>
                        <q-td>
                            <q-input outlined v-model="consultantsFilters.email" label="Filtre Email" dense></q-input>
                        </q-td>
                        <q-td>
                            <q-input outlined v-model="consultantsFilters.position" label="Filtre Position" dense></q-input>
                        </q-td>
                        <q-td>
                            <q-input outlined v-model="consultantsFilters.begin_at" label="Filtre Date de début"
                                dense></q-input>
                        </q-td>
                        <q-td>
                            <q-input outlined v-model="consultantsFilters.skills" label="Filtre Compétences"
                                dense></q-input>
                        </q-td>
                        <q-td>
                            <q-input outlined v-model="consultantsFilters.state" label="Filtre Statut" dense></q-input>
                        </q-td>
                    </q-tr>

                </template>
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th auto-width />
                        <q-th v-for="col in props.cols" :key="col.name" :props="props">
                            {{ col.label }}
                        </q-th>
                    </q-tr>
                </template>

                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td auto-width>
                            <q-btn size="sm" color="green" round dense @click="props.expand = !props.expand"
                                :icon="props.expand ? 'remove' : 'add'" />
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
        <!-- Projects -->
        <div class="q-py-md">
            <div class="row">
                <div class="col-12 col-md-6 q-pr-xl">
                    <h1 class="text-h4 q-pb-md">Nos projets</h1>
                    <q-table title="Consultants" :rows="projectsRows" :columns="projectsColumns" row-key="name"
                        :filter="projectsFilters" :filter-method="filterData">
                        <template v-slot:top>
                            <q-tr>
                                <q-td>
                                </q-td>
                                <q-td>
                                    <q-input outlined v-model="projectsFilters.name" label="Filtre Projet" dense></q-input>
                                </q-td>
                                <q-td>
                                    <q-input outlined v-model="projectsFilters.client" label="Filtre Client"
                                        dense></q-input>
                                </q-td>
                                <q-td>
                                    <q-input outlined v-model="projectsFilters.begin_at" label="Filtre Date de début"
                                        dense></q-input>
                                </q-td>
                                <q-td>
                                    <q-input outlined v-model="projectsFilters.techLead" label="Filtre Compétences"
                                        dense></q-input>
                                </q-td>
                            </q-tr>

                        </template>
                        <template v-slot:header="props">
                            <q-tr :props="props">
                                <q-th auto-width />
                                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                                    {{ col.label }}
                                </q-th>
                            </q-tr>
                        </template>

                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td auto-width>
                                    <q-btn size="sm" color="green" round dense @click="props.expand = !props.expand"
                                        :icon="props.expand ? 'remove' : 'add'" />
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
                <div class="col-12 col-md-6">
                    <h1 class="text-h4 q-pb-md">Nos parcours</h1>

                    <Card>
                        <template #body>
                            <div class="q-pa-md q-gutter-md">
                                <q-chip clickable @click="onClick" color="green" class="text-white">
                                    Ajouter
                                </q-chip>
                                <q-list bordered padding class="rounded-borders">
                                    <q-item-label header>Parcours personnalisés</q-item-label>

                                    <q-item clickable v-ripple>
                                        <q-item-section avatar top>
                                            <q-avatar icon="verified" color="green" text-color="white" />
                                        </q-item-section>

                                        <q-item-section>
                                            <q-item-label lines="1">Product Owner</q-item-label>
                                            <q-item-label caption>February 22nd, 2019</q-item-label>
                                        </q-item-section>

                                        <q-item-section side>
                                            <q-icon name="edit_note" color="green" />
                                        </q-item-section>
                                    </q-item>
                                    <q-separator spaced />
                                    <q-item clickable v-ripple>
                                        <q-item-section avatar top>
                                            <q-avatar icon="supervisor_account" color="red" text-color="white" />
                                        </q-item-section>

                                        <q-item-section>
                                            <q-item-label lines="1">Scrum Master</q-item-label>
                                            <q-item-label caption>March 1st, 2019</q-item-label>
                                        </q-item-section>

                                        <q-item-section side>
                                            <q-icon name="edit_note" />
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
import OpportunitiesView from '../OpportunitiesPage.vue';
import Modal from 'src/components/ModalComponent.vue';
import { reactive, ref } from 'vue';


const selected = ref([]);

const consultantsColumns = [
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


const consultantsRows = [
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
        state: 'Occupé',
        actions: '1%'
    },
]

const consultantsFilters = reactive({
    email: '',
    position: '',
    skills: '',
    begin_at: '',
    state: '',
})

const projectsColumns = [
    { name: 'name', align: 'left', label: 'Nom du projet', field: 'name', sortable: true },
    { name: 'client', align: 'center', label: 'Nom du client', field: 'client', sortable: true },
    { name: 'techLead', align: 'center', label: 'TechLead', field: 'techLead', sortable: true },
    { name: 'begin_at', align: 'center', label: 'Date de début', field: 'begin_at', sortable: true },
]

const projectsRows = [
    {
        name: 'Projet X',
        client: "Total",
        techLead: "Antoine Lecomte",
        begin_at: "25/08/2023",
    },
    {
        name: 'Projet Carbon',
        client: "Louis Vuitton",
        techLead: "Anne Laure Jammes",
        begin_at: "12/02/2025",
    },
]


const projectsFilters = reactive({
    name: '',
    client: '',
    techLead: '',
    begin_at: '',
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